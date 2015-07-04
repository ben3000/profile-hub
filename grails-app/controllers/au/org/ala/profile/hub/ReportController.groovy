package au.org.ala.profile.hub

import au.org.ala.profile.security.Role
import au.org.ala.profile.security.Secured

class ReportController extends BaseController {

    ProfileService profileService

    @Secured(role = Role.ROLE_PROFILE_EDITOR)
    def loadReport() {
        if (!params.opusId || !params.reportId) {
            badRequest()
        } else {
            def response = profileService.loadReport(params.opusId, params.reportId, params.pageSize, params.offset)

            handle response
        }
    }
}