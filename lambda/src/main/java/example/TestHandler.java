package example;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.*;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.io.IOException;
import java.util.*;

public class TestHandler {

    private AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();
    private DynamoDBMapper mapper = new DynamoDBMapper(client);
    private ObjectMapper objmapper = new ObjectMapper();


    public Response addTest(Map<String, Object> input, Context context) throws IOException {
        Response res = new Response();
        String body = (String)input.get("body");
        Test test = objmapper.readValue(body, Test.class);
        mapper.save(test);
        res.body = objmapper.writeValueAsString(test);
		 res.headers.put("Content-type", "application/json");
        res.headers.put("Access-Control-Allow-Origin","*");
        return res;
    }

    public Response deleteTest(Map<String, Object> input, Context context){
        Response res = new Response();
        Map<String, Object> params = (LinkedHashMap<String, Object>) input.get("pathParameters");
        Test test = mapper.load(Test.class,params.get("id"));
        mapper.delete(test);
        res.body= "Operation succeed";
		 res.headers.put("Content-type", "text/html");
        res.headers.put("Access-Control-Allow-Origin","*");
        return res;
    }
    public Response getTest(Map<String, Object> input, Context context) {

        Response res = new Response();

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

    public Response getCandidateTests(Map<String, Object> input, Context context) {

        Response res = new Response();

        try {
            Map<String, Object> params = (LinkedHashMap<String, Object>) input.get("pathParameters");
            objmapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
            String candidate = (String) params.get("candidate");

            DynamoDBScanExpression exp = new DynamoDBScanExpression();
            List<Test> test = mapper.scan(Test.class, exp);
            List<Test> candidateTests = new LinkedList<>();
            for (Test t  : test) {
                if(t.getCandidate().equals(candidate)){
                    candidateTests.add(t);
                }
            }
            res.body = objmapper.writeValueAsString(candidateTests);
            res.headers.put("Content-type", "application/json");
            res.headers.put("Access-Control-Allow-Origin","*");
            return res;
        }
        catch (JsonProcessingException ex) {
            res.body = ex.getMessage();
            return res;

        }
    }


    public Response getAllTests(Map<String, Object> input, Context context) throws JsonProcessingException {

        Response res = new Response();

        objmapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        DynamoDBScanExpression exp = new DynamoDBScanExpression();
        List<Test> test = mapper.scan(Test.class, exp);
        res.body = objmapper.writeValueAsString(test);
        res.headers.put("Content-type", "application/json");
        res.headers.put("Access-Control-Allow-Origin","*");
        return res;

    }


}