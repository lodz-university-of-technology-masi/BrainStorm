package example;

import com.amazonaws.services.dynamodbv2.datamodeling.*;

import java.util.LinkedList;
import java.util.List;

@DynamoDBTable(tableName="Test")
public class Test {

    private String id;
    private String author;
    private String title;
    private List<Pytanie> questions = new LinkedList<Pytanie>();

    public Test(){}

    public Test(String id, String author, String title, List<Pytanie> questions) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.questions = questions;
    }

    @DynamoDBHashKey(attributeName="id")
    @DynamoDBAutoGeneratedKey
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    @DynamoDBAttribute(attributeName="author")
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }

    @DynamoDBAttribute(attributeName="title")
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }


    @DynamoDBAttribute(attributeName="questions")
    public List<Pytanie> getQuestions() {
        return questions;
    }
    public void setQuestions(List<Pytanie> questions) {
        this.questions = questions;
    }

    public static Test findTest(String id,DynamoDBMapper mapper){
        Test t = mapper.load(Test.class, id);

        return t;
    }

    public static void addTest(String id,String author,String title,List<Pytanie> questions, DynamoDBMapper mapper){
        Test t = new Test(id, author,title,questions);
        mapper.save(t);
    }

    public static void deleteTest(String id, DynamoDBMapper mapper){
        Test t = findTest(id, mapper);
        mapper.delete(t);
    }

}