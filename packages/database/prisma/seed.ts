import { PrismaClient, UserStatus, AddressType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.userAddress.deleteMany({});
  await prisma.user.deleteMany({});

  const users = [
    {
      firstName: "John",
      lastName: "Doe",
      initials: "JD",
      email: "john.doe@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      initials: "JS",
      email: "jane.smith@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      initials: "AJ",
      email: "alice.johnson@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Bob",
      lastName: "Brown",
      initials: "BB",
      email: "bob.brown@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Charlie",
      lastName: "Davis",
      initials: "CD",
      email: "charlie.davis@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Emily",
      lastName: "Clark",
      initials: "EC",
      email: "emily.clark@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Frank",
      lastName: "Miller",
      initials: "FM",
      email: "frank.miller@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Grace",
      lastName: "Wilson",
      initials: "GW",
      email: "grace.wilson@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Henry",
      lastName: "Moore",
      initials: "HM",
      email: "henry.moore@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Ivy",
      lastName: "Taylor",
      initials: "IT",
      email: "ivy.taylor@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Jack",
      lastName: "Anderson",
      initials: "JA",
      email: "jack.anderson@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Karen",
      lastName: "Thomas",
      initials: "KT",
      email: "karen.thomas@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Leo",
      lastName: "Martinez",
      initials: "LM",
      email: "leo.martinez@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Mia",
      lastName: "Harris",
      initials: "MH",
      email: "mia.harris@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Nathan",
      lastName: "White",
      initials: "NW",
      email: "nathan.white@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Olivia",
      lastName: "Lopez",
      initials: "OL",
      email: "olivia.lopez@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Peter",
      lastName: "Young",
      initials: "PY",
      email: "peter.young@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Quinn",
      lastName: "Hall",
      initials: "QH",
      email: "quinn.hall@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Ryan",
      lastName: "Allen",
      initials: "RA",
      email: "ryan.allen@example.com",
      status: UserStatus.ACTIVE,
    },
    {
      firstName: "Sophia",
      lastName: "King",
      initials: "SK",
      email: "sophia.king@example.com",
      status: UserStatus.ACTIVE,
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.create({
      data: userData,
    });

    await prisma.userAddress.create({
      data: {
        userId: user.id,
        addressType: AddressType.HOME,
        validFrom: new Date(),
        postCode: "123456",
        city: "Sample City",
        countryCode: "USA",
        street: "Main Street",
        buildingNumber: "10A",
      },
    });
  }

  console.log("Database has been seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
