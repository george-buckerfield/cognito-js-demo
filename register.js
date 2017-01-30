AWSCognito.config.region = 'eu-west-1';
AWSCognito.config.update({accessKeyId: 'null', secretAccessKey: 'null'});
var poolData = { UserPoolId : 'eu-west-1_3Lb5mLRnV',
    ClientId : 'fl51kiknsdrhp47ivi5d8r8pe'
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function doSignup(user) {
  var userEmail = {
      Name : 'email',
      Value : user.email
  };
  var userName = {
      Name: 'name',
      Value: user.name
   };
  var attributeList = [];

  attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(userEmail));
  attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(userName));

  userPool.signUp(user.email, user.password, attributeList, null, function(err, result){
      console.log('Signup function started');
      if (err) {
          console.log(err);
          $("#showRegError").show();
          return;
      }
      else {
          $("#showRegMessage").show();
      }
      cognitoUser = result.user;
      console.log('Successfully created: ' + cognitoUser.getUsername());
  });
};

function doConfirm(user) {
  var userData = {
    Username: user.email,
    Pool: userPool
  };
  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

  cognitoUser.confirmRegistration(user.code, true, (err, result) => {
     if (err) {
        console.log(err);
        $("#showConfirmError").show();
        return false;
     }
     else {
       $("#showConfirmMessage").show();
     }
  });
}
