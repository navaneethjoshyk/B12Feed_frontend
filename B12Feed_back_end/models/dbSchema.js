import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    userOrg: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}
})

const organizationSchema = new mongoose.Schema({
    name: String,
    address: String,
    is_org_registered: Boolean,
    primary_phone_number: String,
    hours_of_operation: String,
    is_registered_charity: Boolean,
    people_served: Number,
    program_frequency: String,
    days_of_operation: [String],
    distribution_method: { type: String, enum:['Walk-in', 'Home Delivery', 'Both']},
    has_vehicle_pickup: Boolean,
    is_vehicle_refrigerated: Boolean,
    storage_space_surplus_status: { type: String, enum:['Yes', 'No', 'Maybe']},
    storage_surplus_type: { type: String, enum:['Dry goods', 'Refrigerated', 'Frozen']},
    can_receive_prepared_food: Boolean,
    orgAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Initial Registration, Will create User and the Org will be saved here
    orgUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], // After onboarding all the other Users will be saved her.
})

const User = mongoose.model('User', userSchema);
const Organization = mongoose.model('Organization', organizationSchema);

export {
    User,
    Organization
};