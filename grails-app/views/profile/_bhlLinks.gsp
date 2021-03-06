<div class="panel panel-default" ng-controller="BHLLinksEditor as bhlCtrl" ng-init="bhlCtrl.init('${edit}')" ng-cloak
     ng-show="!bhlCtrl.readonly || bhlCtrl.bhl.length > 0" ng-form="BhlForm">
    <a name="{{profileCtrl.readonly() ? 'view_' : 'edit_'}}bhllinks"></a>

    <div class="panel-heading">
        <div class="row">
            <div class="col-md-12">
                <h4 class="section-panel-heading">Biodiversity Heritage Library references</h4>
            </div>
        </div>
    </div>

    <div class="panel-body">
        <div class="row section-no-para">
            <div class="col-md-12" ng-if="!bhlCtrl.readonly">
                <p>
                    Add links to the biodiversity heritage library. Links should be of the form:
                    <b>http://biodiversitylibrary.org/page/29003916</b>
                </p>
            </div>
        </div>

        <div ng-repeat="link in bhlCtrl.bhl">
            <div class="row section-no-para">
                <div class="col-md-12">
                    <div ng-show="!bhlCtrl.readonly" class="form-group">
                        <label for="url">URL</label>
                        <input id="url" type="text" class="form-control" ng-model="link.url" value="{{link.url}}"
                               ng-change="bhlCtrl.updateThumbnail($index)"/>
                    </div>

                    <div>
                        <span ng-if="bhlCtrl.readonly && link.title != ''"><span class="minor-heading">Title:&nbsp;</span>{{link.title}}
                        </span>

                        <div ng-show="!bhlCtrl.readonly" class="form-group">
                            <label for="title">Title</label>
                            <input id="title" type="text" class="form-control" ng-model="link.title"
                                   value="{{link.title}}"/>
                        </div>
                    </div>

                    <div>
                        <span ng-if="bhlCtrl.readonly && link.description != ''"><span class="minor-heading">Description:&nbsp;</span>{{link.description}}
                        </span>

                        <div ng-show="!bhlCtrl.readonly" class="form-group">
                            <label for="description">Description</label>
                            <textarea id="description" rows="3" class="form-control"
                                      ng-model="link.description">{{link.description}}</textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row section-no-para">
                <div class="col-md-10">
                    <div ng-show="link.thumbnailUrl">
                        <div ng-show="link.fullTitle != ''">
                            <span class="minor-heading">BHL Title:&nbsp;</span>{{link.fullTitle}}
                        </div>

                        <div ng-show="link.edition != ''">
                            <span class="minor-heading">Edition:&nbsp;</span>{{link.edition}}
                        </div>

                        <div ng-show="link.publisherName != ''">
                            <span class="minor-heading">Publisher:&nbsp;</span>{{link.publisherName}}
                        </div>

                        <div ng-show="link.bhlDoi != ''">
                            <span class="minor-heading">DOI:&nbsp;</span><a href="http://dx.doi.org/{{link.doi}}"
                                                          target="_blank">{{link.doi}}</a>
                        </div>
                    </div>
                </div>

                <div class="col-md-2 margin-bottom-1 text-right" ng-show="link.thumbnailUrl">
                    <a href="{{link.url}}" target="_blank">
                        <img ng-model="link.thumbnailUrl" ng-src="{{link.thumbnailUrl}}"
                             style="max-height:150px;" alt="{{link.title}}" class="img-rounded"/>
                    </a>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12 text-right">
                    <button class="btn btn-danger" ng-if="!bhlCtrl.readonly"
                            ng-click="bhlCtrl.deleteLink($index, BhlForm)">Delete</button>
                    <hr ng-show="!$last"/>
                </div>

            </div>
        </div>
    </div>

    <div class="panel-footer" ng-show="!bhlCtrl.readonly">
        <div class="row">
            <div class="col-md-12">
                <button class="btn btn-default" ng-click="bhlCtrl.addLink(BhlForm)"><i
                        class="fa fa-plus"></i> Add new reference
                </button>
                <button class="btn btn-primary pull-right" ng-click="bhlCtrl.saveLinks(BhlForm)">
                    <span id="saved"><span ng-show="BhlForm.$dirty">*</span> Save</span>
                </button>
            </div>
        </div>
    </div>
</div>