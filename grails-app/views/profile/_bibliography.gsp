<div class="panel panel-default" ng-controller="ProfileController as profileCtrl" ng-cloak ng-form="BiblioForm"
     ng-init="profileCtrl.loadProfile()"
     ng-show="profileCtrl.profile.bibliography.length > 0 || !profileCtrl.readonly()">
    <a name="{{profileCtrl.readonly() ? 'view_' : 'edit_'}}bibliography"></a>

    <div class="panel-heading">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="section-panel-heading">Bibliography</h4>
            </div>
        </div>
    </div>

    <div class="panel-body">

        <div class="row section-no-para" ng-repeat="bibliography in profileCtrl.profile.bibliography">
            <div class="col-sm-10">
                <div ta-bind ng-model="bibliography.text" ng-show="bibliography.uuid" class="inline-block"></div>

                <div class="form-group" ng-show="!bibliography.uuid">
                    <div text-angular text-angular-name="bibliography" ng-model="bibliography.text"
                         ta-toolbar="{{richTextToolbarSimple}}" class="single-line-editor"
                         ng-enter="" ta-max-text="300"></div>
                </div>
            </div>

            <div class="col-sm-2" ng-class="bibliography.uuid ? '' : 'padding-top-1 margin-top-1'" ng-show="!profileCtrl.readonly()">
                <button class="btn btn-link fa fa-trash-o color--red"
                        ng-click="profileCtrl.deleteBibliography($index, BiblioForm)"
                        title="Delete this bibliography entry"></button>
                <button class="btn btn-link fa fa-arrow-down"
                        ng-if="!$last"
                        ng-click="profileCtrl.moveBibliographyDown($index, BiblioForm)"
                        title="Move this bibliography entry down"></button>
                <button class="btn btn-link fa fa-arrow-up" ng-if="!$first"
                        ng-click="profileCtrl.moveBibliographyUp($index, BiblioForm)"
                        title="Move this bibliography entry up"></button>
            </div>
        </div>
    </div>

    <div class="panel-footer" ng-if="!profileCtrl.readonly()">
        <div class="row">
            <div class="col-md-12">
                <button class="btn btn-default" ng-click="profileCtrl.addBibliography(BiblioForm)"><i
                        class="fa fa-plus"></i> Add bibliography</button>
                <button class="btn btn-primary pull-right" ng-click="profileCtrl.saveProfile(BiblioForm)"><span
                        ng-show="BiblioForm.$dirty">*</span> Save</button>
            </div>
        </div>
    </div>
</div>
