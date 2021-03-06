grails.servlet.version = "3.0" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.work.dir = "target/work"
grails.project.target.level = 1.7
grails.project.source.level = 1.7
//grails.project.war.file = "target/${appName}-${appVersion}.war"
//grails.plugin.location.'ala-web-theme' = "../ala-web-theme"

grails.project.fork = [
        test: false,
        run: false
]

grails.project.dependency.resolver = "maven"
grails.project.dependency.resolution = {

    inherits("global") {
        excludes "grails-docs" // This is to remove itext conficting version with jasperreports and we don't need that plugin anyway
    }
    log "error" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve
    legacyResolve false // whether to do a secondary resolve on plugin installation, not advised and here for backwards compatibility

    def httpmimeVersion = "4.3.3"

    repositories {
        mavenLocal()
        mavenRepo ("http://nexus.ala.org.au/content/groups/public/") {
            updatePolicy 'always'
        }
    }

    dependencies {
        compile 'net.sf.ehcache:ehcache:2.8.4'
        compile "org.apache.httpcomponents:httpmime:${httpmimeVersion}"
        runtime "org.springframework:spring-test:4.1.2.RELEASE" // required by the rendering plugin

        compile('net.sf.jasperreports:jasperreports:6.1.0') {
            excludes 'antlr', 'commons-logging',
                    'ant', 'mondrian', 'commons-javaflow','barbecue', 'xml-apis-ext','xml-apis', 'xalan', 'groovy-all', 'hibernate', 'saaj-api', 'servlet-api',
                    'xercesImpl','xmlParserAPIs','spring-core','bsh', 'spring-beans', 'jaxen', 'barcode4j','batik-svg-dom','batik-xml','batik-awt-util','batik-dom',
                    'batik-css','batik-gvt','batik-script', 'batik-svggen','batik-util','batik-bridge','persistence-api','jdtcore','bcmail-jdk16','bcprov-jdk16','bctsp-jdk16',
                    'bcmail-jdk14','bcprov-jdk14','bctsp-jdk14','xmlbeans', 'olap4j'
        }
        compile 'net.sf.jasperreports:jasperreports-functions:6.1.0'
        compile 'net.sf.jasperreports:jasperreports-fonts:6.1.0'
        compile 'net.glxn:qrgen:1.4'
    }

    plugins {
        build ":release:3.0.1"
        build ":tomcat:7.0.55"

        compile ":mail:1.0.7"
        compile ":cache:1.1.6"
        compile ":uploadr:0.8.2"
        compile ":cors:1.1.6"
        compile ":modernizr:2.7.1.1"
        compile ":csv:0.3.1"
        compile(":jasper:1.11.0") {
            excludes 'jasperreports'
        }

        runtime ":resources:1.2.14"
        runtime ":ala-bootstrap3:1.1"
        runtime ":ala-auth:1.2"
    }
}
