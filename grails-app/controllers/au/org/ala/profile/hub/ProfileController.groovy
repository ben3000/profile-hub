package au.org.ala.profile.hub

import groovy.json.JsonSlurper

class ProfileController {

    def index() {}

    def edit(){
        def model = buildProfile(params.uuid)
        //need CAS check here
        model.put("edit", true)
        render(view: "show", model: model)
    }

    def save(){






    }

    def show(){
        buildProfile(params.uuid)
    }

    private def buildProfile(String uuid){

        println("getProfile " + uuid )

        def js = new JsonSlurper()

        def profile = js.parseText(new URL("http://localhost:8081/profile-service/profile/" + URLEncoder.encode(uuid, "UTF-8")).text)

        def opus = js.parseText(new URL("http://localhost:8081/profile-service/opus/${profile.opusId}").text)

        def query = ""

        if(profile.guid){
            query = "lsid:" + profile.guid
        } else {
            query = profile.scientificName
        }


        if(opus.recordSources){
            query = query + " AND (data_resource_uid:" + opus.recordSources.join(" OR ") + ")"
        }

        def imagesQuery = query + "&fq=multimedia:Image"

        //WMS URL
        def listsURL = "http://lists.ala.org.au/ws/species/${profile.guid}"
        [
                occurrenceQuery: query,
                imagesQuery: imagesQuery,
                opus: opus,
                profile: profile,
                lists: []
        ]
    }
}
