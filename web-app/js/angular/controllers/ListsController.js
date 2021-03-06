/**
 * Species Lists controller
 */
profileEditor.controller('ListsEditor', function (profileService, navService, util, messageService, $filter) {
    var self = this;

    self.lists = [];
    self.conservationStatuses = [];
    self.bioStatuses = [];

    var orderBy = $filter("orderBy");

    self.init = function (edit) {
        self.readonly = edit != 'true';

        self.opusId = util.getEntityId("opus");
        self.profileId = util.getEntityId("profile");

        var profilePromise = profileService.getProfile(self.opusId, self.profileId);
        profilePromise.then(function (data) {
                self.profile = data.profile;
                self.opus = data.opus;

                loadLists();
            },
            function () {
                messageService.alert("An error occurred while retrieving the profile.");
            }
        );
    };

    self.loadConservationStatus = function () {
        var promise = profileService.getSpeciesProfile(self.opusId, self.profileId, self.profile.guid);
        promise.then(function (data) {
            self.conservationStatuses = orderBy(data.conservationStatuses, "region");

            if (self.conservationStatuses && self.conservationStatuses.length > 0) {
                navService.add("Status", "statuses");
            }
        });
    };

    self.loadBioStatus = function () {
        var promise = profileService.getBioStatus(self.opusId, self.profileId);
        promise.then(function (data) {
            self.bioStatuses = orderBy(data, 'key');
            if (self.bioStatuses && self.bioStatuses.length > 0) {
                navService.add("Status", "statuses");
            }
        });
    };

    self.getColourForStatus = function (status) {
        var colour;

        if (/extinct$/i.test(status) || /wild/i.test(status)) {
            colour = "red";
        } else if (/Critically/i.test(status) || /^Endangered/i.test(status) || /Vulnerable/i.test(status)) {
            colour = "yellow";
        } else {
            colour = "green";
        }

        return colour;
    };

    self.statusRegions = {
        "": {id: "dr657", abbrev: "IUCN"},
        "IUCN": {id: "dr657", abbrev: "IUCN"},
        "Australia": {id: "dr656", abbrev: "AU"},
        "Australian Capital Territory": {id: "dr649", abbrev: "ACT"},
        "New South Wales": {id: "dr650", abbrev: "NSW"},
        "Northern Territory": {id: "dr651", abbrev: "NT"},
        "Queensland": {id: "dr652", abbrev: "QLD"},
        "South Australia": {id: "dr653", abbrev: "SA"},
        "Tasmania": {id: "dr654", abbrev: "TAS"},
        "Victoria": {id: "dr655", abbrev: "VIC"},
        "Western Australia": {id: "dr467", abbrev: "WA"}
    };

    function loadLists() {
        if (self.profile.guid) {
            messageService.info("Loading lists...");

            var listsPromise = profileService.retrieveLists(self.opusId, self.profileId, self.profile.guid);

            listsPromise.then(function (data) {
                    console.log("Fetched " + data.length + " lists");

                    self.lists = [];

                    angular.forEach(data, function (list) {
                        if (!self.opus.approvedLists || self.opus.approvedLists.length == 0 || self.opus.approvedLists.indexOf(list.dataResourceUid) > -1) {
                            self.lists.push(list);
                        }
                    });

                    self.lists = orderBy(self.lists, 'listName');

                    if (self.lists.length > 0) {
                        navService.add("Conservation & Sensitivity Lists", "lists");
                    }

                },
                function () {
                    messageService.alert("An error occurred while retrieving the lists.");
                }
            );

            self.loadConservationStatus();
            self.loadBioStatus();
        }
    }
});