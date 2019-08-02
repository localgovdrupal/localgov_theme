<!-- You may need to add the following MIME MAPS to your Azure web.config file to enable embedded fonts -->
<configuration>
	<system.webServer>
        	<staticContent>
			<!-- Allow JSON -->
           		<mimeMap fileExtension=".json" mimeType="application/json" />
			<!-- Allow WOFF for Azure Font Face Embedding →
			<mimeMap fileExtension="woff" mimeType="application/font-woff" />
			<mimeMap fileExtension="woff2" mimeType="application/font-woff" />      
		</staticContent>
	</system.webServer>
</configuration>
