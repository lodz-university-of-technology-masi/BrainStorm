package example;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.*;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class RecruitmentTestsHandler {

    private AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();
    private DynamoDBMapper mapper = new DynamoDBMapper(client);
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
        res.body = Test.findTest("1",mapper).toString();
        Test.deleteTest("1",mapper);
        res.headers.put("Content-type", "text/html");

        return res;

    }

}