<div ng-controller="MapController as mapCtrl"
     ng-init="mapCtrl.init('${grailsApplication.config.biocache.base.url}${grailsApplication.config.biocache.wms.path}', '${grailsApplication.config.biocache.base.url}${grailsApplication.config.biocache.occurrence.info.path}')"
     class="panel">

        <leaflet style="height: 400px; margin-top:10px;" center="mapCtrl.center" layers="mapCtrl.layers" event-broadcast="mapCtrl.events"></leaflet>

        <a class="btn"
           href="${opus.biocacheUrl}/occurrences/search?q={{mapCtrl.constructQuery()}}" >View in ${opus.biocacheName}</a>

</div>

<div id="firstImage" ng-show="imageCtrl.firstImage" ng-controller="ImagesController as imageCtrl" ng-init="imageCtrl.init('${edit}')">
    <div class="imgConXXX">
        <a href="${grailsApplication.config.biocache.base.url}${grailsApplication.config.biocache.occurrence.record.path}{{imageCtrl.firstImage.uuid}}"
           target="_self" ng-if="imageCtrl.firstImage.largeImageUrl">
            <img ng-src="{{imageCtrl.firstImage.largeImageUrl}}" ng-if="imageCtrl.firstImage.largeImageUrl"/>
        </a>

        <div class="meta">{{ imageCtrl.firstImage.dataResourceName }}</div>
    </div>
</div>

