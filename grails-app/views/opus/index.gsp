<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="${grailsApplication.config.layout}"/>
    <meta name="logoUrl" content="${logoUrl}"/>
    <title>Profile collections | Atlas of Living Australia</title>

    <r:require module="profiles"/>
</head>

<body>

<div ng-controller="OpusController as opusCtrl" class="margin-bottom-3">
    <div class="row">
        <div class="col-md-12">

            <h2 class="heading-large">Profile Collections</h2>

            <g:if test="${params.isALAAdmin}">
                <div class="pull-right">
                    <a class="btn btn-default" href="${request.contextPath}/opus/create"
                       target="_self">Create a new collection</a>
                </div>
            </g:if>

            <tabset>
                <tab heading="Collections" class="font-xxsmall">
                    <div ng-cloak>
                        <div class="col-md-12">
                            <h3 class="heading-medium">Browse by individual collection</h3>
                        </div>

                        <div ng-repeat="opus in opusCtrl.opusList | orderBy: 'title'" class="col-md-2 col-sm-4 col-xs-6 text-center div-centre" style="min-height: 170px; height: 170px">
                            <a href="${request.contextPath}/opus/{{opus.shortName ? opus.shortName : opus.uuid}}"
                               target="_self">
                                <img class="img-responsive collection-thumbnail thumbnail"
                                     src="{{opus.thumbnailUrl | default:'${request.contextPath}/images/generic_flower.png'}}"
                                     alt="{{opus.title}} logo" title="{{opus.title}}"></a>
                            <h4 class="font-xxsmall" style="width: 160px;"><a
                                    href="${request.contextPath}/opus/{{opus.shortName ? opus.shortName : opus.uuid}}"
                                    target="_self"><strong>{{opus.title}}</strong></a></h4>
                        </div>

                        <div ng-show="opusCtrl.opusList.length == 0" class="col-md-12 padding-top-1">
                            There are no visible collections.
                        </div>
                    </div>
                </tab>
                <tab heading="Quick Search" class="font-xxsmall">
                    <g:include controller="opus" action="searchPanel" params="[opusId: params.opusId]"/>
                </tab>
            </tabset>

        </div>
    </div>
</div>
</body>

</html>