<!-- template for the popup displayed when Export as PDF is selected -->
<script type="text/ng-template" id="exportPdf.html">
<div ng-form="PDFForm">
    <div class="modal-header">
        <h4 class="modal-title">Export as PDF</h4>
    </div>

    <div class="modal-body">
        <p>
            Select the items you wish to include in the PDF.
        </p>

        <div class="row">
            <div ng-repeat="o in pdfCtrl.options | orderBy:'name'">
                <div class="radio">
                    <label for="{{o.id}}" class="inline-label">
                        <input id="{{o.id}}" type="checkbox" name="o.name" ng-model="o.selected"
                               ng-false-value="false">
                        {{o.name}}
                    </label>
                </div>
            </div>

            <div class="col-md-12"
                 ng-show="(pdfCtrl.options | filter:{id: 'children'})[0].selected && pdfCtrl.childCount > pdfCtrl.ASYNC_THRESHOLD">
                <hr class="col-md-11"/>

                <p>Producing this PDF may take some time. Please enter your email address, and you will be notified when the file is ready for download.</p>

                <div class="form-group">
                    <label for="email">Email address</label>
                    <input id="email" type="text" class="form-control" ng-required="true" ng-model="pdfCtrl.email"
                           required="true">
                </div>
            </div>
        </div>
    </div>

    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="pdfCtrl.ok()"
                ng-disabled="((pdfCtrl.options | filter:{id: 'children'})[0].selected && PDFForm.$invalid && pdfCtrl.childCount > pdfCtrl.ASYNC_THRESHOLD) || pdfCtrl.loading">
            <i class="fa fa-spin fa-spinner" ng-show="pdfCtrl.loading">&nbsp;&nbsp;</i>OK</button>
        <button class="btn btn-default" ng-click="pdfCtrl.cancel()">Cancel</button>
    </div>
</div>
</script>