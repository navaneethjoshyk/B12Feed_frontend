import { registerUserOrg } from "../services/userService.js";
import { findUserOrg, updateOrg, resourcePost, claimResource } from "../services/orgService.js";
import { User, Organization, ResourcePost, ResourceImage, ClaimStatus } from "../models/dbSchema.js"
import { faker } from "@faker-js/faker";
import { userOrg } from "../controllers/orgController.js";

const loadDummyData = async () => {
    await User.deleteMany({});
    await Organization.deleteMany({});
    await ResourcePost.deleteMany({});
    await ResourceImage.deleteMany({});
    await ClaimStatus.deleteMany({});

    for(let i=0; i<2; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const user = await registerUserOrg(firstName, lastName, faker.internet.email({ firstName: firstName }), faker.internet.password(), faker.company.name(), faker.location.streetAddress(), faker.phone.number())
        for(let j=0; j<4; j++) {
            const resourcePost = await ResourcePost.insertOne({
                organization_id: user.userOrg,
                user_id: user._id,
                title: faker.food.dish(),
                category: "Prepared",
                quantity: faker.finance.amount({ min: 1, max: 25, dec: 0 }),
                unit: "lbs",
                condition: "Fresh",
                pickup_window_start: "12:00 PM",
                pickup_window_end: "8:00 PM",
                location: faker.location.streetAddress(),
                description: faker.food.description(),
                resource_expiry: "2026-02-26",
                urgency_indicator: "Medium",
                handling_requirement: "With Care",
                created_at: new Date(),
                updated_at: new Date(),
            })

            const imagePost = await ResourceImage.insertOne({
                resource_post_id: resourcePost._id,
                image: [faker.image.url()],
                image_description: "test1"
            })
            resourcePost.resource_image = imagePost._id;
            await resourcePost.save();
        }
    }

    
}

export default loadDummyData;