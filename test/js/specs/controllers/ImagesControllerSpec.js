describe("ImagesController tests", function () {
    var controller;
    var scope;
    var mockUtil = {
        getPathItem: function () {
            return "12345"
        },
        getEntityId: function (str) {
            if (str == "opus") {
                return "opusId1"
            } else if (str == "profile") {
                return "profileId1"
            }
        },
        LAST: "last"
    };
    var form = {
        $setPristine: function () {},
        $setDirty: function () {}
    };
    var messageService;
    var profileService;
    var profileDefer, imageDefer, saveDefer, metadataDefer;

    var getProfileResponse = '{"profile": {"guid": "guid1", "scientificName":"profileName", "excludedImages": ["imageId2"]}, "opus": {"imageSources": ["source1", "source2"]}}';
    var retrieveImagesResponse = '[{"imageId": "imageId1", "largeImageUrl": "url1", "dataResourceName": "name1"}, {"imageId": "imageId2", "largeImageUrl": "url2", "dataResourceName": "name2"}]';

    beforeAll(function () {
        console.log("****** Images Controller Tests ******");
    });
    afterAll(function () {
        console.log("----------------------------");
    });

    beforeEach(module("profileEditor"));

    beforeEach(inject(function ($controller, $rootScope, _profileService_, $q, _messageService_) {
        scope = $rootScope.$new();
        profileService = _profileService_;

        profileDefer = $q.defer();
        imageDefer = $q.defer();
        saveDefer = $q.defer();
        metadataDefer = $q.defer();

        spyOn(profileService, "getProfile").and.returnValue(profileDefer.promise);
        spyOn(profileService, "retrieveImages").and.returnValue(imageDefer.promise);
        spyOn(profileService, "updateProfile").and.returnValue(saveDefer.promise);
        spyOn(profileService, "getImageMetadata").and.returnValue(metadataDefer.promise);

        spyOn(form, "$setPristine");
        spyOn(form, "$setDirty");

        messageService = jasmine.createSpyObj(_messageService_, ["success", "info", "alert", "pop"]);

        controller = $controller("ImagesController as imageCtrl", {
            $scope: scope,
            profileService: profileService,
            util: mockUtil,
            messageService: messageService
        });
    }));

    it("should set the profile attribute of the current scope when init is called", function () {
        profileDefer.resolve(JSON.parse(getProfileResponse));
        imageDefer.resolve(JSON.parse(retrieveImagesResponse));

        scope.imageCtrl.init("false");
        scope.$apply();

        expect(scope.imageCtrl.profile).toBeDefined();
    });

    it("should set the opus attribute of the current scope when init is called", function () {
        profileDefer.resolve(JSON.parse(getProfileResponse));
        imageDefer.resolve(JSON.parse(retrieveImagesResponse));

        scope.imageCtrl.init("false");
        scope.$apply();

        expect(scope.imageCtrl.opus).toBeDefined();
    });

    it("should set the readonly flag to false when init is called with edit=false", function () {
        profileDefer.resolve(JSON.parse(getProfileResponse));
        imageDefer.resolve(JSON.parse(retrieveImagesResponse));
        scope.imageCtrl.init("false");
        scope.$apply();

        expect(scope.imageCtrl.readonly).toBe(true);
    });

    it("should set the readonly flag to false when init is called with edit=true", function () {
        profileDefer.resolve(JSON.parse(getProfileResponse));
        imageDefer.resolve(JSON.parse(retrieveImagesResponse));

        scope.imageCtrl.init("true");
        scope.$apply();

        expect(scope.imageCtrl.readonly).toBe(false);
    });

    it("should set the images array on the scope with the results from the retrieveImages call", function () {
        profileDefer.resolve(JSON.parse(getProfileResponse));
        imageDefer.resolve(JSON.parse(retrieveImagesResponse));

        scope.imageCtrl.init("false");
        scope.$apply();

        expect(scope.imageCtrl.images).toBeDefined();
        expect(scope.imageCtrl.images.length).toBe(2);
    });

    it("should default the primaryImage to the first item in the retrieveImages response", function () {
        profileDefer.resolve(JSON.parse(getProfileResponse));
        imageDefer.resolve(JSON.parse(retrieveImagesResponse));

        scope.imageCtrl.init("false");
        scope.$apply();

        expect(scope.imageCtrl.primaryImage).toBeDefined();
        expect(scope.imageCtrl.primaryImage.largeImageUrl).toBe("url1");
    });

    it("should set the primaryImage to the image identified by the primaryImage attribute of the profile if present", function () {
        var getProfileResponse = '{"profile": {"guid": "guid1", "scientificName":"profileName", "primaryImage": "imageId2"}, "opus": {"imageSources": ["source1", "source2"]}}';
        profileDefer.resolve(JSON.parse(getProfileResponse));
        imageDefer.resolve(JSON.parse(retrieveImagesResponse));

        scope.imageCtrl.init("false");
        scope.$apply();

        expect(scope.imageCtrl.primaryImage).toBeDefined();
        expect(scope.imageCtrl.primaryImage.largeImageUrl).toBe("url2");
    });

    it("should raise an alert message when the call to getProfile fails", function () {
        profileDefer.reject();
        imageDefer.resolve(JSON.parse(retrieveImagesResponse));

        scope.imageCtrl.init("false");
        scope.$apply();

        expect(scope.imageCtrl.profile).not.toBeDefined();
        expect(messageService.alert).toHaveBeenCalledWith("An error occurred while retrieving the profile.");
    });

    it("should raise an alert message when the call to retrieveImages fails", function () {
        profileDefer.resolve(JSON.parse(getProfileResponse));
        imageDefer.reject();

        scope.imageCtrl.init("false");
        scope.$apply();

        expect(scope.imageCtrl.images.length).toBe(0);
        expect(messageService.alert).toHaveBeenCalledWith("An error occurred while retrieving the images.");
    });

    it("should add a 'loading images' info message when retrieving the images, and remove it when done", function () {
        profileDefer.resolve(JSON.parse(getProfileResponse));
        imageDefer.resolve(JSON.parse(retrieveImagesResponse));

        scope.imageCtrl.init("false");
        scope.$apply();

        expect(messageService.info).toHaveBeenCalledWith("Loading images...");
        expect(messageService.info.calls.count()).toBe(1);
    });

    it("should use the scientificName to retrieve images if the profile.guid attribute is not present", function () {
        scope.imageCtrl.opusId = "opusId1";
        scope.imageCtrl.profileId = "profileId1";
        var getProfileResponse = '{"profile": {"guid": "", "scientificName":"profileName"}, "opus": {"dataResourceUid": "drId", "imageSources": ["source1", "source2"]}}';

        profileDefer.resolve(JSON.parse(getProfileResponse));
        imageDefer.resolve(JSON.parse(retrieveImagesResponse));

        scope.imageCtrl.init("false");
        scope.$apply();

        expect(profileService.retrieveImages).toHaveBeenCalledWith("opusId1", "profileId1", "profileName", "drId,source1,source2");
    });

    it("should use the profile.guid attribute prefixed with 'lsid:' to retrieve images if it is present", function () {
        scope.imageCtrl.opusId = "opusId1";
        scope.imageCtrl.profileId = "profileId1";
        var getProfileResponse = '{"profile": {"guid": "guid1", "scientificName":"profileName"}, "opus": {"dataResourceUid": "drId", "imageSources": ["source1", "source2"]}}';

        profileDefer.resolve(JSON.parse(getProfileResponse));
        imageDefer.resolve(JSON.parse(retrieveImagesResponse));

        scope.imageCtrl.init("false");
        scope.$apply();

        expect(profileService.retrieveImages).toHaveBeenCalledWith("opusId1", "profileId1", "lsid:guid1", "drId,source1,source2");
    });

    it("should ensure only 1 image is primary when changePrimaryImage is invoked", function() {
        scope.imageCtrl.images = [{imageId: "image1", primary: true}, {imageId: "image2", primary: false}, {imageId: "image3", primary: false}];

        scope.imageCtrl.changePrimaryImage("image2", form);

        expect(scope.imageCtrl.images[0].primary).toBeFalsy();
        expect(scope.imageCtrl.images[1].primary).toBeTruthy();
        expect(scope.imageCtrl.images[2].primary).toBeFalsy();
        expect(form.$setDirty).toHaveBeenCalled();
    });

    it("should add all excluded images to the profile's excludedImages list on save", function() {
        scope.imageCtrl.profile = {uuid: "profile1"};
        scope.imageCtrl.images = [{imageId: "image1", excluded: true}, {imageId: "image2", excluded: false}, {imageId: "image3", excluded: true}];
        scope.imageCtrl.opusId = "opusId";
        scope.imageCtrl.profileId = "profileId";

        var expectedProfile = {uuid: "profile1", excludedImages: ["image1", "image3"]};

        scope.imageCtrl.saveProfile(form);

        expect(profileService.updateProfile).toHaveBeenCalledWith("opusId", "profileId", expectedProfile);
    });

    it("should set the primary image attribute of the profile on save", function() {
        scope.imageCtrl.profile = {uuid: "profile1"};
        scope.imageCtrl.images = [{imageId: "image1", primary: false}, {imageId: "image2", primary: true}, {imageId: "image3", primary: false}];
        scope.imageCtrl.opusId = "opusId";
        scope.imageCtrl.profileId = "profileId";

        var expectedProfile = {uuid: "profile1", primaryImage: "image2", excludedImages: []};

        scope.imageCtrl.saveProfile(form);

        expect(profileService.updateProfile).toHaveBeenCalledWith("opusId", "profileId", expectedProfile);
    });
});