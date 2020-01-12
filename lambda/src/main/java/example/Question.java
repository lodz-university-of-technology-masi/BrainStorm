package example;

import com.amazonaws.services.dynamodbv2.datamodeling.*;

import java.util.LinkedList;
import java.util.List;


@DynamoDBTable(tableName="Question")
public class Question {

    private String id;

    private String question;
    private List<String> answer = new LinkedList<>();
    private String context;
    public Question(String id, String question, List<String> answer, String context) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.context = context;
    }

    public Question(){}



    //@DynamoDBAutoGeneratedKey
    @DynamoDBHashKey(attributeName = "id")
    @DynamoDBAutoGeneratedKey
    public String getId() {
        return id;
    }

    public void setId(String  id) {
        this.id = id;
    }

    @DynamoDBAttribute(attributeName = "question")
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    @DynamoDBAttribute(attributeName = "answer")
    public List<String> getAnswer() {
        return answer;
    }

    public void setAnswer(List<String> answer) {
        this.answer = answer;
    }

    @DynamoDBAttribute(attributeName = "context")
    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

}
