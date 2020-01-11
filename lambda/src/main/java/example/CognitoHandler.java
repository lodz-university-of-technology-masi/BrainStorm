package example;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.transform.EnhancedJsonErrorUnmarshaller;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CognitoHandler{

    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();
    private ObjectMapper objmapper = new ObjectMapper();

    public Response test(Map<String, Object> input, Context context) throws IOException {
        Response res = new Response();
        String body = (String)input.get("body");
        User user = objmapper.readValue(body, User.class);
        res.body = objmapper.writeValueAsString(user);
        res.headers.put("Content-type", "application/json");
        res.headers.put("Access-Control-Allow-Origin","*");
        return res;
    }

    public Response test2(Map<String, Object> input, Context context) throws IOException {
        Response res = new Response();
        String body = (String)input.get("body");
        User user = objmapper.readValue(body, User.class);
        res.body = user.toString();
        res.headers.put("Content-type", "application/json");
        res.headers.put("Access-Control-Allow-Origin","*");
        return res;
    }

   public Response getName(Map<String, Object> input, Context context) throws IOException {
       Response res = new Response();
       String body = (String)input.get("body");
       User user = objmapper.readValue(body, User.class);
       String username = user.getUserName();
        AdminGetUserRequest adminGetUserRequest = new AdminGetUserRequest()
                .withUserPoolId("us-east-1_PqkszmvwY")
                .withUsername(username);
        AdminGetUserResult adminGetUserResult = cognito.adminGetUser(adminGetUserRequest);
//        res.body= adminGetUserResult.getUsername();
        res.body= body + "tojestBody  ";
        res.body+= input.toString();
        res.headers.put("Content-type", "application/json");
        res.headers.put("Access-Control-Allow-Origin","*");
        return res;
    }

    public Response getUsers(Map<String, Object> input, Context context) throws IOException {
        Response res = new Response();
        ListUsersResult users = cognito.listUsers(new ListUsersRequest().withUserPoolId("us-east-1_PqkszmvwY"));
//        ListUsersInGroupRequest request = new ListUsersInGroupRequest().withUserPoolId("us-east-1_PqkszmvwY").withGroupName("Candidate");
       // ListUsersInGroupResult users=cognito.listUsersInGroup(request);
        List<UserType> candidates = new ArrayList<>();
        for (UserType can: users.getUsers()
             ) {
            for (AttributeType atribute:can.getAttributes()
                 ) {
                if(atribute.getName().equals("custom:isRecruiter") && atribute.getValue().equals("0")){
                    candidates.add(can);
                }
            }
        }
        res.body = objmapper.writeValueAsString(candidates);
        res.headers.put("Content-type", "application/json");
        res.headers.put("Access-Control-Allow-Origin","*");
        return res;
    }

    public Response addUser(Map<String, Object> input, Context context) throws IOException {
        Response res = new Response();
        String body = (String)input.get("body");
        User user = objmapper.readValue(body, User.class);
        AdminCreateUserRequest createUserRequest = new AdminCreateUserRequest()
                .withUserPoolId("us-east-1_PqkszmvwY")
                .withUsername(user.getUserName())
                .withUserAttributes(new AttributeType()
                        .withName("custom:isRecruiter")
                        .withValue("0"));
        AdminCreateUserResult createUserResult =  cognito.adminCreateUser(createUserRequest);
        AdminSetUserPasswordRequest passwordRequest = new AdminSetUserPasswordRequest()
                .withUserPoolId("us-east-1_PqkszmvwY")
                .withUsername(user.getUserName())
                .withPassword(user.getPassword())
                .withPermanent(true);
        cognito.adminSetUserPassword(passwordRequest);
//        AdminAddUserToGroupRequest group = new AdminAddUserToGroupRequest()
//                .withUserPoolId("us-east-1_PqkszmvwY")
//                .withGroupName("Candidate")
//                .withUsername(user.getUserName());
//        cognito.adminAddUserToGroup(group);
        res.body = "Dodano " + user.getUserName();
        res.headers.put("Content-type", "application/json");
        res.headers.put("Access-Control-Allow-Origin","*");
        return res;
    }

    public Response deleteUsers(Map<String, Object> input, Context context) throws IOException {
        Response res = new Response();
        String body = (String)input.get("body");
        User user = objmapper.readValue(body, User.class);
        AdminDeleteUserRequest adminDeleteUserRequest = new AdminDeleteUserRequest()
                .withUserPoolId("us-east-1_PqkszmvwY")
                .withUsername(user.getUserName());
        cognito.adminDeleteUser(adminDeleteUserRequest);
        res.body = "Usunieto " + user.getUserName();
        res.headers.put("Content-type", "application/json");
        res.headers.put("Access-Control-Allow-Origin","*");
        return res;
    }


}
