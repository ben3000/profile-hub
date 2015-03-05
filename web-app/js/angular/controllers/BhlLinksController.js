/**
 * BHL Links controller
 */
profileEditor.controller('BHLLinksEditor', function (profileService, util, messageService) {
    var self = this;
    
    self.bhl = [];

    self.init = function (edit) {
        self.readonly = edit != 'true';

        var future = profileService.getProfile(util.getPathItem(util.LAST));

        future.then(function (data) {
            self.profile = data.profile;
            self.opus = data.opus;
            self.bhl = data.profile.bhl;
            console.log("Fetched " + self.bhl.length + " BHL links");
        },
        function () {
            messageService.alert("An error occurred while retrieving the Biodiversity Heritage References.");
        });
    };

    self.updateThumbnail = function (idx) {
        console.log("Updating...");
        var url = self.bhl[idx].url.trim();
        if (url) {
            var pageId = util.getPathItemFromUrl(util.LAST, url);

            var bhlPromise = profileService.lookupBhlPage(pageId);
            bhlPromise.then(function (data) {
                    self.bhl[idx].thumbnailUrl = data.thumbnailUrl;
                    self.bhl[idx].fullTitle = data.Result.FullTitle;
                    self.bhl[idx].edition = data.Result.Edition;
                    self.bhl[idx].publisherName = data.Result.PublisherName;
                    self.bhl[idx].doi = data.Result.Doi;
                },
                function () {
                    messageService.alert("Failed to lookup page information from the biodiversity heritage library.");
                }
            );
        }
    };

    self.addLink = function () {
        self.bhl.unshift(
            {
                url: "",
                description: "",
                title: "",
                thumbnailUrl: ""
            });
    };

    self.deleteLink = function (idx) {
        self.bhl.splice(idx, 1);
    };

    self.saveLinks = function () {
        var promise = profileService.updateBhlLinks(self.profile.uuid, JSON.stringify({
            profileId: self.profile.uuid,
            links: self.bhl
        }));
        promise.then(function () {
                messageService.success("Links successfully updated.");
            },
            function () {
                messageService.alert("An error occurred while updating the links.");
            }
        );
    };
});
