import mongoose from "mongoose";

// User with Organization reference
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    userOrg: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}
})

// Organization properties with orgAdmin reference and orgUser reference
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

// Resource properties with organization reference
const resourcePostSchema = new mongoose.Schema({
    organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization'},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    category: String,
    description: String,
    quantity: Number,
    unit: {
        type: String,
        enum: ['crate', 'boxes', 'bags', 'portions', 'kg', 'lbs'],
        required: true
    },
    condition: String,
    pickup_window_start: String,
    location: String,
    handling_requirement: String,
    resource_expiry: Date,
    urgency_indicator: String,
    created_at: Date,
    updated_at: Date,
    status: String,
    pickup_window_end: String,
    resource_image: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ResourceImage'}],
    claim_status_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClaimedStatus'}]
})

const resourceImageSchema = new mongoose.Schema({
    resource_post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ResourcePost'},
    image: [String],
    image_description: String
})

// Claimed food Status
const claimStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending pickup', 'completed', 'expired', 'failed pickup'],
        required: true
    },
    resource_post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ResourcePost' },
    organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    claimed_date: Date,
    expired_date: Date,
    pickup_date: Date
})

const User = mongoose.model('User', userSchema);
const Organization = mongoose.model('Organization', organizationSchema);
const ResourcePost = mongoose.model('ResourcePost', resourcePostSchema);
const ResourceImage = mongoose.model('ResourceImage', resourceImageSchema);
const ClaimStatus = mongoose.model('ClaimedStatus', claimStatusSchema);

export {
    User,
    Organization,
    ResourcePost,
    ResourceImage,
<<<<<<< HEAD
    ClaimStatus
=======
>>>>>>> 7af64ab (added the multer module)
};