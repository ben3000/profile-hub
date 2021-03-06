/**
 * Specimen controller
 */
profileEditor.controller('SpecimenController', function (profileService, util, messageService, config) {
    var self = this;

    self.specimens = [];

    self.readonly = function () {
        return config.readonly;
    };

    self.loadSpecimens = function () {
        self.opusId = util.getEntityId("opus");
        self.profileId = util.getEntityId("profile");

        var future = profileService.getProfile(self.opusId, self.profileId);

        future.then(function (data) {
                self.profile = data.profile;
                self.opus = data.opus;

                self.specimens = [];

                angular.forEach(data.profile.specimenIds, function (specimenId, index) {
                    self.specimens.push({id: specimenId});
                    self.lookupSpecimenDetails(index, specimenId, null);
                });
                console.log("Fetched " + self.specimens.length + " specimens");
            },
            function () {
                messageService.alert("An error occurred while retrieving the Biodiversity Heritage References.");
            });
    };

    self.loadSpecimens();

    self.lookupSpecimenDetails = function (index, specimenId, url) {
        console.log("Updating...");
        var saved = true;

        if (url) {
            specimenId = util.getPathItemFromUrl(util.LAST, url);
            console.log("Using " + specimenId + " from url " + url);
            saved = false;
        }

        if (specimenId && util.isUuid(specimenId)) {
            var promise = profileService.lookupSpecimenDetails(specimenId);
            promise.then(function (data) {
                    var specimen = self.specimens[index];

                    specimen.id = specimenId;
                    specimen.collectionName = data.processed.attribution.collectionName;
                    specimen.collectionUid = data.processed.attribution.collectionUid;
                    specimen.institutionName = data.processed.attribution.institutionName;
                    specimen.institutionUid = data.processed.attribution.institutionUid;
                    specimen.catalogNumber = data.raw.occurrence.catalogNumber;
                    specimen.saved = saved;
                },
                function () {
                    messageService.alert("Failed to lookup specimen information.");
                }
            );
        } else {
            self.specimens[index] = {url: url};
        }
    };

    self.isValid = function() {
        // if the specimen list is empty but the profile has ids, then the user probably deleted everything - treat this as valid
        var valid = self.specimens.length > 0 || (self.specimens.length == 0 && self.profile && self.profile.specimenIds &&  self.profile.specimenIds.length > 0);
        angular.forEach(self.specimens, function(spec) {
            valid = valid && util.isUuid(spec.id);
        });

        return valid;
    };

    self.addSpecimen = function (form) {
        self.specimens.push({
            id: "",
            url: "",
            saved: false
        });

        form.$setDirty();
    };

    self.deleteSpecimen = function (idx, form) {
        self.specimens.splice(idx, 1);

        if (self.specimens.length > 0 || (self.specimens.length == 0 && self.profile.specimenIds && self.profile.specimenIds.length > 0)) {
            form.$setDirty();
        } else {
            form.$setPristine();
        }
    };

    self.save = function (form) {
        self.profile.specimenIds = [];
        angular.forEach(self.specimens, function(specimen) {
            self.profile.specimenIds.push(specimen.id);
        });

        var promise = profileService.updateProfile(self.opusId, self.profile.uuid, self.profile);
        promise.then(function () {
                messageService.success("Specimens successfully updated.");

                form.$setPristine();
            },
            function () {
                messageService.alert("An error occurred while updating the specimens.");
            }
        );
    };
});
