package example;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.*;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class RecruitmentTestsHandler {

    private AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();
    private DynamoDBMapper mapper = new DynamoDBMapper(client);
    private ObjectMapper objmapper = new ObjectMapper();
    private APIGatewayProxyResponseEvent p = new APIGatewayProxyResponseEvent();

    public APIGatewayProxyResponseEvent t3(APIGatewayProxyRequestEvent input, Context context) {
        p.setBody(input.getBody());
        p.setStatusCode(200);
        return p;
    }


    public APIGatewayProxyResponseEvent t2(Map<String, Object> input, Context context){
        String s = "";
        for (Object a:input.values()) {
            s += a.toString();
        }
        for (Object a:input.keySet()) {
            s += a;
        }
        p.setBody(s);
        p.setStatusCode(200);
        return p;
    }

    public Map<String, Object> t(Map<String, Object> input, Context context) {
        return input;
    }
    public ApiGatewayResponse t1(Map<String, Object> input, Context context) {
        ApiGatewayResponse res = new ApiGatewayResponse();
        for (Object a:input.values()) {
            res.body += a.toString();
        }
        for (Object a:input.keySet()) {
            res.body += a;
        }
        return res;
    }

    public ApiGatewayResponse getTest(Map<String, Object> input, Context context) {

        //ApiGatewayRequest req = new ApiGatewayRequest(input);
        ApiGatewayResponse res = new ApiGatewayResponse();

        try {
            Map<String, Object> params = (LinkedHashMap<String, Object>) input.get("pathParameters");
            Test test = mapper.load(Test.class, (String) params.get("id"));
            res.body = objmapper.writeValueAsString(test);
            res.headers.put("Content-type", "application/json");
            res.headers.put("Access-Control-Allow-Origin","*");
            return res;
        }
        catch (JsonProcessingException ex) {
            res.body = ex.getMessage();
            return res;

        }
    }


    public ApiGatewayResponse getAllTests(Map<String, Object> input, Context context) throws JsonProcessingException {

        ApiGatewayResponse res = new ApiGatewayResponse();

        objmapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        DynamoDBScanExpression exp = new DynamoDBScanExpression();
        //exp.setProjectionExpression("id");
        List<Test> test = mapper.scan(Test.class, exp);
        res.body = objmapper.writeValueAsString(test);
//        String s = objmapper.writeValueAsString(test);
//        s =s.substring(1);
//        s = s.substring(0,s.length()-1);
//        res.body=s;
        res.headers.put("Content-type", "application/json");
        res.headers.put("Access-Control-Allow-Origin","*");
        return res;

    }


    public ApiGatewayResponse myHandler(Map<String, Object> input, Context context) {


        ApiGatewayResponse res = new ApiGatewayResponse();
        //Dodanie pytania i sprwadzenie czy mozna pobrac z DynamoDB
//        Pytanie.addQuestion("1","Ile masz lat?","21","Pytanie 1",mapper);
//        Pytanie.addQuestion("2","Jak sie nazywasz?","Maciek","Pytanie 2",mapper);
//        Pytanie p =Pytanie.findQuestion("2",mapper);
//        res.body= "Witaj " + p.getAnswer();

        //Dodanie testu,usuniecie i wyciagniecie informacji
        List<Pytanie> listp = new LinkedList<Pytanie>();
        listp.add(Pytanie.findQuestion("1",mapper));
        listp.add(Pytanie.findQuestion("2",mapper));
        Test.addTest("1","autor1","test rekrutacyjny",listp,mapper);
        Test t = Test.findTest("1",mapper);
//        res.body = objmapper.writeValueAsString(t);

        Map<String, String> m = new LinkedHashMap<>();
        m.putIfAbsent("id",t.getId().toString());
        m.putIfAbsent("candidate",t.getCandidate().toString());
        //res.body = t.getId().toString() + " " + t.getCandidate();
        res.body = m.toString();
        //Test.deleteTest("1",mapper);
        res.headers.put("Content-type", "text/html");

        return res;

    }

}