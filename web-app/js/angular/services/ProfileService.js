/**
 * Angular service for interacting with the profile service application
 */
profileEditor.service('profileService', function ($http, util, $cacheFactory) {

    function clearCache() {
        console.log("Clearing $http cache");
        var httpCache = $cacheFactory.get('$http');
        httpCache.removeAll();
    }

    return {
        getProfile: function (profileId) {
            console.log("Fetching profile " + profileId);

            var future = $http.get(util.contextRoot() + "/profile/json/" + profileId, {cache: true});
            future.then(function (response) {
                console.log("Profile fetched with response code " + response.status);
            });

            return util.toStandardPromise(future);
        },

        deleteProfile: function(profileId, opusId) {
            console.log("Deleting profile " + profileId + " from opus " + opusId);
            var future = $http.delete(util.contextRoot() + "/profile/delete?profileId=" + profileId + "&opusId=" + opusId);
            future.then(function (response) {
                console.log("Profile deleted with response code " + response.status);
            });

            return util.toStandardPromise(future);
        },

        getOpus: function (opusId) {
            // make sure we have a UUID, not just the last element of some other URL (e.g. create)
            if (!util.isUuid(opusId)) {
                return;
            }

            console.log("Fetching opus " + opusId);

            var future = $http.get(util.contextRoot() + "/opus/json/" + opusId, {cache: true});
            future.then(function (response) {
                console.log("Opus fetched with response code " + response.status);
            });

            return util.toStandardPromise(future);
        },

        listOpus: function() {
            console.log("Fetching all opuses");
            var future = $http.get(util.contextRoot() + "/opus/list", {cache: true});
            future.then(function(response) {
                console.log("Opus list fetched with response code " + response.status);
            });

            return util.toStandardPromise(future);
        },

        saveOpus: function(opusId, opus) {
            var future;
            if (opusId) {
                console.log("Saving opus " + opusId);
                future = $http.post(util.contextRoot() + "/opus/" + opusId, opus);
            } else {
                console.log("Creating new opus...");
                future = $http.put(util.contextRoot() + "/opus/", opus);
            }
            future.then(function(response) {
                console.log("Opus saved with response code " + response.status);

                clearCache();
            });

            return util.toStandardPromise(future);
        },

        getOpusVocabulary: function (vocubularyId) {
            console.log("Fetching vocabulary " + vocubularyId);
            var future = $http.get(util.contextRoot() + "/vocab/" + vocubularyId, {cache: true});
            future.then(function (response) {
                console.log("Vocab fetched with response code " + response.status);

                clearCache();
            });
            return util.toStandardPromise(future);
        },

        updateVocabulary: function(vocabularyId, data) {
            console.log("Updating vocabulary " + vocabularyId);
            var future = $http.post(util.contextRoot() + "/vocab/" + vocabularyId, data);
            future.then(function(response) {
                console.log("Vocab updated with response code " + response.status);
            });
            return util.toStandardPromise(future);
        },

        findUsagesOfVocabTerm: function(vocabularyId, termName) {
            console.log("Finding usages of vocab term " + termName + " from vocab " + vocabularyId);
            var future = $http.get(util.contextRoot() + "/vocab/usages/find?vocabId=" + vocabularyId + "&termName=" + termName);
            future.then(function (response) {
                console.log("Usages found with response code " + response.status)
            });
            return util.toStandardPromise(future);
        },

        replaceUsagesOfVocabTerm: function(data) {
            console.log("Replacing usages of vocab terms");
            var future = $http.post(util.contextRoot() + "/vocab/usages/replace", data);
            future.then(function (response) {
                console.log("Terms replaced with response code " + response.status)
            });
            return util.toStandardPromise(future);
        },

        getAuditForAttribute: function (attributeId) {
            console.log("Fetching audit for attribute " + attributeId);
            var future = $http.get(util.contextRoot() + "/audit/object/" + attributeId, {cache: true});
            future.then(function (response) {
                console.log("Audit fetched with response code " + response.status)
            });
            return util.toStandardPromise(future);
        },

        deleteAttribute: function (attributeId, profileId) {
            console.log("Deleting attribute " + attributeId);
            var future = $http.delete(util.contextRoot() + "/profile/deleteAttribute/" + attributeId + "?profileId=" + profileId, {cache: true});
            future.then(function (response) {
                console.log("Attribute deleted with response code " + response.status)

                clearCache();
            });
            return util.toStandardPromise(future);
        },

        saveAttribute: function (profileId, attributeId, data) {
            console.log("Saving attribute " + attributeId);
            var future = $http.post(util.contextRoot() + "/profile/updateAttribute/" + profileId, data);
            future.then(function (response) {
                console.log("Attribute saved with response code " + response.status)

                clearCache();
            });
            return util.toStandardPromise(future);
        },

        retrieveImages: function (searchIdentifier, imageSources) {
            console.log("Retrieving images for " + searchIdentifier);
            var future = $http.get(util.contextRoot() + "/profile/images?searchIdentifier=" + searchIdentifier + "&imageSources=" + imageSources, {cache: true});
            future.then(function (response) {
                console.log("Images retrieved with response code " + response.status)
            });
            return util.toStandardPromise(future);
        },

        retrieveLists: function (guid) {
            console.log("Retrieving lists for " + guid);
            var future = $http.get(util.contextRoot() + "/profile/lists?guid=" + guid, {cache: true});
            future.then(function (response) {
                console.log("Lists retrieved with response code " + response.status)
            });
            return util.toStandardPromise(future);
        },

        getClassifications: function (guid, opusId) {
            console.log("Retrieving classifications for " + guid);
            var future = $http.get(util.contextRoot() + "/profile/classifications?guid=" + guid + "&opusId=" + opusId, {cache: true});
            future.then(function (response) {
                console.log("Classifications retrieved with response code " + response.status)
            });
            return util.toStandardPromise(future);
        },

        getSpeciesProfile: function (guid) {
            console.log("Retrieving species profile for " + guid);
            var future = $http.get(util.contextRoot() + "/profile/speciesProfile?guid=" + guid, {cache: true});
            future.then(function (response) {
                console.log("Species Profile retrieved with response code " + response.status)
            });
            return util.toStandardPromise(future);
        },

        updateLinks: function(profileId, links) {
            console.log("Updating links for profile " + profileId);
            var future = $http.post(util.contextRoot() + "/profile/updateLinks/" + profileId, links);
            future.then(function (response) {
                console.log("Links updated with response code " + response.status);

                clearCache();
            });
            return util.toStandardPromise(future);
        },

        updateBhlLinks: function(profileId, links) {
            console.log("Updating BHL links for profile " + profileId);
            var future = $http.post(util.contextRoot() + "/profile/updateBHLLinks/" + profileId, links);
            future.then(function (response) {
                console.log("BHL Links updated with response code " + response.status);

                clearCache();
            });
            return util.toStandardPromise(future);
        },

        lookupBhlPage: function(pageId) {
            console.log("Looking up BHL page " + pageId);
            var future = $http.get(util.contextRoot() + "/bhl/" + pageId);
            future.then(function (response) {
                console.log("BHL page retrieved with response code " + response.status);
            });
            return util.toStandardPromise(future);
        },

        profileSearch: function(opusId, scientificName, useWildcard) {
            console.log("Searching for " + scientificName);
            if (typeof useWildcard == 'undefined') {
                useWildcard = true;
            }
            var future = $http.get(util.contextRoot() + "/profile/search?opusId=" + opusId + "&scientificName=" + scientificName + "&useWildcard=" + useWildcard);
            future.then(function (response) {
                console.log("Profile search returned with response code " + response.status);
            });
            return util.toStandardPromise(future);
        },

        listResources: function () {
            console.log("Fetching all resources");

            var future = $http.get(util.contextRoot()+ "/dataResource/list");
            future.then(function (response) {
                console.log("Resources fetched with response code " + response.status);
            });

            return util.toStandardPromise(future);
        },

        getResource: function (dataResourceId) {
            console.log("Fetching resource " + dataResourceId);

            var future = $http.get(util.contextRoot()+ "/dataResource/" + dataResourceId);
            future.then(function (response) {
                console.log("Resource fetched with response code " + response.status);
            });

            return util.toStandardPromise(future);
        },

        userSearch: function(email) {
            console.log("Searching for user " + email);

            var future = $http.post(util.contextRoot() + "/opus/findUser", {userName: email});
            future.then(function (response) {
                console.log("Search completed with response code " + response.status);
            });

            return util.toStandardPromise(future);
        },

        updateUsers: function(opusId, admins, editors) {
            console.log("Updating users for opus " + opusId);

            var data = {
                opusId: opusId,
                admins: admins,
                editors: editors
            };

            var future = $http.post(util.contextRoot() + "/opus/updateUsers", data);
            future.then(function (response) {
                console.log("Update Users completed with response code " + response.status);

                clearCache();
            });

            return util.toStandardPromise(future);
        }
    }
});