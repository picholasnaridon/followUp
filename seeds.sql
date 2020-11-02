create database crm_dev;
drop database crm_dev;
use crm_dev;

INSERT INTO crm_dev.Users(firstName, lastName, email, password)
VALUES("Nick", "Paridon", "paridonn1@gmail.com", "test123"),
      ("Alex", "Paridon","alex@doctor.com","test123");
          
INSERT INTO crm_dev.Companies(name)
VALUES("Piano.io"), 
	("PipelineDeals");
        
INSERT INTO crm_dev.Contacts(firstName, UserId, CompanyId)
VALUES("contact1", 1, 1),
      ("contact2", 1, 1),
      ("contact3", 2, 2);

INSERT INTO crm_dev.Deals(name, amount, status, UserId)
VALUES("deal1", 500, "pending", 1),
      ("deal2", 400, "pending", 1),
      ("deal3", 200, "closed", 2);


INSERT INTO crm_dev.ContactDeals(DealId, ContactId)
VALUES(1,1),
      (1,2)
				
