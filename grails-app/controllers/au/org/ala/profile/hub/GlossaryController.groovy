package au.org.ala.profile.hub

import au.org.ala.profile.security.Role
import au.org.ala.profile.security.Secured
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.multipart.MultipartHttpServletRequest

import static au.org.ala.profile.hub.util.HubConstants.*

class GlossaryController extends BaseController {

    ProfileService profileService

    def view() {
        if (!params.opusId) {
            badRequest()
        } else {
            def opus = profileService.getOpus(params.opusId as String)

            if (!opus) {
                notFound()
            } else {
                render(view: 'glossary', model: [
                        logoUrl: opus.logoUrl ?: DEFAULT_OPUS_LOGO_URL,
                        bannerUrl: opus.bannerUrl ?: DEFAULT_OPUS_BANNER_URL,
                        pageTitle: "${opus.title} Glossary" ?: DEFAULT_OPUS_TITLE
                ])
            }
        }
    }

    @Secured(role = Role.ROLE_PROFILE_ADMIN)
    def upload() {
        if (!params.opusId) {
            badRequest()
        } else {
            List items = []

            MultipartFile file = null
            if (request instanceof MultipartHttpServletRequest) {
                file = request.getFile("file")
            }

            if (!file) {
                badRequest()
            } else {
                file.inputStream.eachCsvLine { tokens ->
                    items << [term: tokens[0], description: tokens[1]]
                }

                def response = profileService.uploadGlossary(params.opusId, params.glossaryId, items)

                handle response
            }
        }
    }

    def getGlossary() {
        if (!params.opusId) {
            badRequest()
        } else {
            def response = profileService.getGlossary(params.opusId as String)

            handle response
        }
    }

    @Secured(role = Role.ROLE_PROFILE_ADMIN)
    def deleteItem() {
        if (!params.opusId || !params.glossaryItemId) {
            badRequest()
        } else {
            def response = profileService.deleteGlossaryItem(params.opusId as String, params.glossaryItemId as String)

            handle response
        }
    }

    @Secured(role = Role.ROLE_PROFILE_ADMIN)
    def updateItem() {
        def json = request.getJSON()

        if (!params.opusId || !params.glossaryItemId || !json) {
            badRequest()
        } else {
            def response = profileService.updateGlossaryItem(params.opusId as String, params.glossaryItemId as String, json)

            handle response
        }
    }

    @Secured(role = Role.ROLE_PROFILE_ADMIN)
    def saveItem() {
        def json = request.getJSON()

        if (!params.opusId || !json) {
            badRequest()
        } else {
            def response = profileService.createGlossaryItem(params.opusId as String, json)

            handle response
        }
    }
}
