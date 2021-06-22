create database testcicata;
use testCicata;

create table logData(
                        id int(11) not null auto_increment
                            primary key,
                        userName varchar(15) not null,
                        email varchar(30) not null,
                        password varchar(10) not null,
                        curp varchar(18) not null
);

create table personalDataUsers(
                                  idPersonalData int(11) not null auto_increment
                                      primary key,
                                  name varchar(15) not null,
                                  lastName varchar(15) not null,
                                  birthDate varchar(10) not null,
                                  userIdPersonal int(11),
                                  constraint fk_user foreign key (userIdPersonal) references logData(id)
);

create table additionalInformation(
                                      idInfo int(11) not null auto_increment
                                          primary key,
                                      birthPlace varchar(15) not null,
                                      address varchar(25) not null,
                                      numberPhone varchar(10) not null,
                                      maritalStatus varchar(12),
                                      skypeAccount varchar(25),
                                      userIdAdditional int(11),
                                      constraint fk_user_additional foreign key (userIdAdditional) references logData(id)
);

create table academicData(
                             idAcademicData1 int(11) not null auto_increment
                                 primary key,
                             previousInstitution varchar(25) not null,
                             countryOFInstitution varchar(25) not null,
                             postgraduateCareer varchar(25) not null,
                             title varchar(25) not null,
                             professionalExperience varchar(25) not null,
                             teachingExperience varchar(25) not null,
                             userIdAcademic int(11),
                             constraint fk_user_academic1 foreign key (userIdAcademic) references logData(id)
);

create table moreAcademicData(
                                 idAcademicData2 int(11) not null auto_increment
                                     primary key,
                                 course varchar(25) not null,
                                 yearsAssisted varchar(25) not null,
                                 reason varchar(25) not null,
                                 kind varchar(25) not null,
                                 date timestamp not null default current_timestamp,
                                 userIdMore int(11),
                                 constraint fk_user_academic2 foreign key (userIdMore) references logData(id)
);

create table files(
                      idFile int(11) not null auto_increment
                          primary key,
                      jobTitle mediumblob not null,
                      professionalLicense mediumblob not null,
                      masterDiploma mediumblob not null,
                      birthCertificate mediumblob not null,
                      file mediumblob not null,
                      cv mediumblob not null,
                      signedApplication mediumblob not null,
                      researchWork mediumblob not null,
                      officialIdentification mediumblob not null,
                      userIdFiles int(11),
                      constraint fk_user_files foreign key (userIdFiles) references logData(id)
);