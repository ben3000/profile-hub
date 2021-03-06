<div class="panel panel-default" ng-controller="SpecimenController as specCtrl" ng-cloak ng-form="SpecimenForm"
     ng-show="specCtrl.specimens.length > 0 || !specCtrl.readonly()">
    <a name="{{profileCtrl.readonly() ? 'view_' : 'edit_'}}specimens"></a>

    <div class="panel-heading">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="section-panel-heading">Specimens</h4>
            </div>
        </div>
    </div>

    <div class="panel-body">
        <div class="row section-no-para">
            <div class="col-sm-12" ng-if="!specCtrl.readonly()">
                <p>
                    Add links to specimen pages. Links should be of the form:
                    <br/><b>http://biocache.ala.org.au/occurrences/e0fd3aca-7b21-44de-abe4-6b392cd32aae</b>
                </p>
            </div>
        </div>

        <div ng-repeat="specimen in specCtrl.specimens">
            <div class="row section-no-para">
                <div class="col-sm-12">
                    <div ng-if="!specCtrl.readonly() && !specimen.saved">
                        <div class="form-group">
                            <label>URL</label>
                            <input type="text" class="form-control" ng-model="specimen.url"
                                   ng-change="specCtrl.lookupSpecimenDetails($index, null, specimen.url)"/><br/>
                            <alert type="danger"
                                   ng-if="specimen.url && !specimen.id">Invalid URL. The URL must of the form specified above.</alert>
                        </div>
                    </div>

                    <div ng-if="specimen.institutionName"><span class="minor-heading">Institution Name:&nbsp;</span><a
                            href="${grailsApplication.config.collectory.base.url}/public/show/{{specimen.institutionUid}}"
                            target="_blank">{{specimen.institutionName}}</a></div>

                    <div ng-if="specimen.collectionName"><span class="minor-heading">Collection:&nbsp;</span><a
                            href="${grailsApplication.config.collectory.base.url}/public/show/{{specimen.collectionUid}}"
                            target="_blank">{{specimen.collectionName}}</a></div>

                    <div ng-if="specimen.catalogNumber"><span class="minor-heading">Catalog Number:&nbsp;</span>{{specimen.catalogNumber}}
                    </div>

                    <div ng-if="specimen.id"><a
                            href="${grailsApplication.config.biocache.base.url}/occurrences/{{specimen.id}}"
                            target="_blank">View specimen record</a></div>
                </div>

                    <div class="col-md-12">
                        <div ng-if="!specCtrl.readonly()" class="pull-right">
                            <button class="btn btn-danger"
                                    ng-click="specCtrl.deleteSpecimen($index, SpecimenForm)">Delete</button>
                        </div>
                    </div>

                <hr ng-if="!$last"/>
            </div>
        </div>
    </div>

    <div class="panel-footer" ng-if="!specCtrl.readonly()">
        <div class="row">
            <div class="col-md-12">
                <button class="btn btn-default" ng-click="specCtrl.addSpecimen(SpecimenForm)"><i
                        class="fa fa-plus"></i> Add Specimen</button>
                <button class="btn btn-primary pull-right" ng-click="specCtrl.save(SpecimenForm)"
                        ng-disabled="!specCtrl.isValid()"><span
                        ng-show="SpecimenForm.$dirty">*</span> Save</button>
            </div>
        </div>
    </div>
</div>
