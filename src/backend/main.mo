import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  public type ApplicationStatus = {
    #received;
    #in_progress;
    #approved;
    #declined;
  };

  public type VisaApplication = {
    applicationReferenceNumber : Text;
    passportNumber : Text;
    dateOfBirth : Text;
    status : ApplicationStatus;
    applicationType : Text;
    submissionDate : Time.Time;
    lastUpdated : Time.Time;
  };

  let visaApplications = Map.empty<Text, VisaApplication>();

  public shared ({ caller }) func submitVisaApplication(referenceNumber : Text, passportNumber : Text, dateOfBirth : Text, applicationType : Text) : async () {
    let newApplication : VisaApplication = {
      applicationReferenceNumber = referenceNumber;
      passportNumber;
      dateOfBirth;
      status = #received;
      applicationType;
      submissionDate = Time.now();
      lastUpdated = Time.now();
    };

    visaApplications.add(referenceNumber, newApplication);
  };

  public query ({ caller }) func getVisaApplication(referenceNumber : Text) : async ?VisaApplication {
    visaApplications.get(referenceNumber);
  };

  public shared ({ caller }) func updateApplicationStatus(referenceNumber : Text, newStatus : ApplicationStatus) : async () {
    switch (visaApplications.get(referenceNumber)) {
      case (null) { Runtime.trap("Application not found") };
      case (?application) {
        let updatedApplication : VisaApplication = {
          application with
          status = newStatus;
          lastUpdated = Time.now();
        };
        visaApplications.add(referenceNumber, updatedApplication);
      };
    };
  };

  public shared ({ caller }) func seedSampleApplications() : async () {
    let app1 : VisaApplication = {
      applicationReferenceNumber = "REF123456";
      passportNumber = "P12345678";
      dateOfBirth = "1990-01-01";
      status = #received;
      applicationType = "Tourist";
      submissionDate = Time.now();
      lastUpdated = Time.now();
    };

    let app2 : VisaApplication = {
      applicationReferenceNumber = "REF234567";
      passportNumber = "P23456789";
      dateOfBirth = "1985-05-12";
      status = #in_progress;
      applicationType = "Business";
      submissionDate = Time.now();
      lastUpdated = Time.now();
    };

    let app3 : VisaApplication = {
      applicationReferenceNumber = "REF345678";
      passportNumber = "P34567890";
      dateOfBirth = "1978-02-17";
      status = #approved;
      applicationType = "Student";
      submissionDate = Time.now();
      lastUpdated = Time.now();
    };

    let app4 : VisaApplication = {
      applicationReferenceNumber = "REF456789";
      passportNumber = "P45678901";
      dateOfBirth = "1995-04-25";
      status = #declined;
      applicationType = "Tourist";
      submissionDate = Time.now();
      lastUpdated = Time.now();
    };

    visaApplications.add("REF123456", app1);
    visaApplications.add("REF234567", app2);
    visaApplications.add("REF345678", app3);
    visaApplications.add("REF456789", app4);
  };
};
