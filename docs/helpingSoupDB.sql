create table customer(
	customerID int IDENTITY(1, 1) NOT NULL PRIMARY KEY,
	customerFirstName varchar(50) NULL,
	customerLastName varchar(50) NULL,
	customerPhone char(10) NULL,
	customerEmail varchar(100) NULL,
	customerStreetAddress varchar(100) NULL,
	customerCity varchar(100) NULL,
	customerZip char(5) NULL
);

create table goods(
	goodsID int IDENTITY(1, 1) NOT NULL PRIMARY KEY,
	customerID int FOREIGN KEY REFERENCES customer(customerID),
	pickupDate Date NULL,
	pickupTime Time NULL,
	startTime Datetime2 NULL,
	endTime Datetime2 NULL,
	goodsNotes varchar(250) NULL,
	goodsAssigned Bit NULL
);

create table volunteer(
	volunteerEmail varchar(100) NOT NULL PRIMARY KEY,
	volunteerStreetAddress varchar(100) NULL,
	volunteerCity varchar(100) NULL,
	volunteerZip char(5) NULL,
	volunteerPassword varchar(100) NOT NULL,
	volunteerSchool varchar(100) NULL,
	volunteerFirstName varchar(50) NULL,
	volunteerLastName varchar(50) NULL
);

create table volunteerDelivery(
	deliveryNotesID int IDENTITY(1, 1) NOT NULL PRIMARY KEY,
	deliveryNotes varchar(250) NULL,
	deliveryStatus Bit NULL,
	volunteerEmail varchar(100) FOREIGN KEY REFERENCES volunteer(volunteerEmail),
	goodsID int FOREIGN KEY REFERENCES goods(goodsID)
);