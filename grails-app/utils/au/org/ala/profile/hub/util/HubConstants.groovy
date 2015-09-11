package au.org.ala.profile.hub.util

import grails.util.Holders


class HubConstants {
    static final String DEFAULT_OPUS_TITLE = "Profile Collections"
    static final String DEFAULT_OPUS_VOCAB = "Not specified"
    static final String DEFAULT_OPUS_LOGO_URL = "http://root.ala.org.au/bdrs-core/files/download.htm?className=au.com.gaiaresources.bdrs.model.theme.Theme&id=217&fileName=processed/images/bdrs/atlasoflivingaust.png"//"${Holders.config.ala.base.url}/wp-content/themes/ala2011/images/logo.png"
    static final String DEFAULT_OPUS_BANNER_URL = "${Holders.config.images.service.url}/store/7/4/4/e/a08a52f2-7bbe-40d9-8f1a-fe8acb28e447/original"
    static final String ALA_FOOTER_TEXT = "ALA Profiles provides a central location to gather collections of species profiles."
    static final String ALA_CONTACT_EMAIL = "http://www.ala.org.au/about-the-atlas/contact-us/"
    static final String ALA_CONTACT_FACEBOOK = "https://www.facebook.com/atlasoflivingaustralia"
    static final String ALA_CONTACT_TWITTER = "https://twitter.com/#!/atlaslivingaust"

    static final String GENERIC_COPYRIGHT_TEXT = """
            <p>The material in profiles is protected by copyright laws and may be used as permitted under the Copyright Act 1968 or in accordance with licences granted by the copyright owner.</p>

            <p>Images and maps used in this profile have been contributed to the ALA and are subject to copyright. Your right to use these is subject to the terms of the licence that the contributor has applied to the image or map. You may not remove any copyright or other notices applied to maps. In some cases you may need to seek the permission of the copyright owner to use images. Information on using images can be found <a href="http://www.ala.org.au/faq/using-images-found-on-the-ala/" target="_blank">here</a>.</p>

            <p>Text used in this profile has been contributed by the editors and others identified. Except where indicated, text is licensed under a <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0 License</a>.</p>

            <p>No rights are granted to the Commonwealth Coat of Arms or to any logos or trademarks used on the site.</p>

            <p>If you believe material available on this website infringes any rights or breaches any contract or licence obligations please contact us <a href="mailto:support@ala.org.au">support@ala.org.au</a> with details.</p>
"""
}
