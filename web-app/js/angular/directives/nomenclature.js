profileEditor.directive('nomenclature', function ($browser) {
    return {
        restrict: 'AE',
        require: [],
        scope: {
            nslNameId: '=',
            nslNomenclatureId: '=',
            readonly: '@'
        },
        templateUrl: $browser.baseHref() + 'static/templates/nomenclature.html',
        controller: ['$scope', '$http', 'profileService', function ($scope, $http, profileService) {
            $scope.selectedReference = null;
            $scope.nslNomenclatureId = null;
            $scope.loading = false;
            $scope.viewInNslLink = null;
            var IGNORE_STATUSES = ["legitimate", "[n/a]"];

            $scope.loadConcepts = function () {
                $scope.loading = true;
                if (!$scope.references) {
                    profileService.getNomenclatureList($scope.nslNameId).
                        then(function (resp) {
                            $scope.references = [];

                            angular.forEach(resp.references, function (reference) {
                                var referenceUrl = reference._links.permalink.link;
                                var referenceId = referenceUrl.substring(referenceUrl.lastIndexOf("/") + 1);
                                var name = reference.citation;
                                if (isTruthy(reference.APCReference)) {
                                    name += " (APC)";
                                }
                                var formattedName = reference.citationHtml;
                                if (reference.citations && reference.citations.length > 1 && reference.citations[0].page) {
                                    formattedName += " " + reference.citations[0].page;
                                }
                                var details = [];

                                var firstInstanceId = null;
                                angular.forEach(reference.citations, function (citation) {
                                    var text = citation.relationship;
                                    if (citation.name && citation.name.nameStatus && IGNORE_STATUSES.indexOf(citation.name.nameStatus) == -1) {
                                        text = text + " " + citation.name.nameStatus;
                                    }
                                    details.push(text);

                                    var citationUrl = citation.instance._links.permalink.link;
                                    var instanceId = citationUrl.substring(citationUrl.lastIndexOf("/") + 1);

                                    if (!firstInstanceId) {
                                        firstInstanceId = instanceId;
                                    }
                                });

                                angular.forEach(reference.notes, function (note) {
                                    if (note.instanceNoteKey === "Type") {
                                        details.unshift("<b>Type:</b> " + note.instanceNoteText);
                                    }
                                });

                                var ref = {
                                    instanceId: firstInstanceId,
                                    referenceId: referenceId,
                                    url: referenceUrl,
                                    name: name,
                                    formattedName: formattedName,
                                    details: details,
                                    apcReference: isTruthy(reference.APCReference)
                                };

                                if (firstInstanceId == $scope.nslNomenclatureId) {
                                    $scope.selectedReference = ref;
                                    $scope.viewInNslLink = reference.citations[0].instance._links.permalink.link;
                                }

                                $scope.references.push(ref);
                            });

                            $scope.loading = false;
                        }
                    );
                }
            };

            $scope.toggleSynonomy = function() {
                $scope.showSynonomy = !$scope.showSynonomy;
            };
        }
        ],
        link: function (scope, element, attrs, ctrl) {
            scope.$watch("nslNameId", function (newValue) {
                if (newValue !== undefined) {
                    scope.nslNameId = newValue;
                    scope.loadConcepts();
                }
            });
            scope.$watch("nslNomenclatureId", function (newValue) {
                if (newValue !== undefined) {
                    scope.nslNomenclatureId = newValue;

                    if (!scope.selectedReference && scope.nslNameId) {
                        scope.loadConcepts();
                    }
                }
            });
            scope.$watch("selectedReference", function (newValue) {
                if (newValue !== undefined) {
                    scope.selectedReference = newValue;
                    scope.nslNomenclatureId = newValue == null ? null : newValue.instanceId;
                }
            }, true);
            scope.$watch("readonly", function (newValue) {
                scope.readonly = isTruthy(newValue);
            });
        }
    };

    function isTruthy(str) {
        return str == true || str === "true"
    }

});