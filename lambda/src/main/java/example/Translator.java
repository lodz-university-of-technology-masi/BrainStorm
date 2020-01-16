package example;

import org.json.JSONObject;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;


public class Translator {
    private final static String YANDEX_KEY = "trnsl.1.1.20200116T202427Z.8048c796fc5820ad.eaf473ce4a831791d23b179d778eaaf5405111d9";

    private Translator(){}

    public static String translateText(String text, String fromLang, String toLang) throws IOException, Exception {

        URL url = createURL(text, fromLang, toLang);
        return getRequestToYandex(url);
    }

    private static String readAllFromStream(InputStream inputStream) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        br.close();
        return sb.toString();
    }

    private static String getRequestToYandex(URL url) throws IOException, Exception {
        URLConnection connection = url.openConnection();
        InputStream is = connection.getInputStream();
        JSONObject json = new JSONObject(readAllFromStream(is));
        if (200 == (int) json.get("code")) {
            String translatedTest = json.get("text").toString();
            return translatedTest.substring(2, translatedTest.length() - 2);
        } else {
            throw new Exception("Error from site, result code different than '200'");
        }

    }

    private static URL createURL(String text, String fromLang, String toLang) {
        try {
            String urlTmp = "https://translate.yandex.net/api/v1.5/tr.json/translate";
            urlTmp += "?key=" + YANDEX_KEY;
            urlTmp += "&text=" + URLEncoder.encode(text, "UTF-8");
            urlTmp += "&lang=" + fromLang + "-" + toLang;
            return new URL(urlTmp);
        } catch (MalformedURLException | UnsupportedEncodingException e) {
            return null;
        }
    }
}
