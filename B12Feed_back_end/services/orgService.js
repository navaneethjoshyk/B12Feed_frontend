import { User, Organization } from '../models/dbSchema.js';

// Load the User with it's Organization
const findUserOrg = async (email) => {
    return await User.findOne({
        email: email
    }).populate('userOrg');
}

// Load the Org
const updateOrg = async (id, form) => {
    const {
        name,
        address,
        primary_phone_number,
        hours_of_operation,
        is_org_registered,
        people_served,
        program_frequency,
        days_of_operation,
        distribution_method,
        vehicle_pickup,
        vehicle_refrigerated,
        storage_space_for_surplus_food,
        storage_type,
        can_you_receive_prepared_food
    } = form; // The variable name will change due to front end

    const ident = id;

    const orgInfo = User.findOneAndUpdate({
        _id: ident
    }, {
        name: name,
        address: address,
        is_org_registered: is_org_registered,
        primary_phone_number: primary_phone_number,
        hours_of_operation: hours_of_operation,
        is_registered_charity: is_org_registered,
        people_served: people_served,
        program_frequency: program_frequency,
        days_of_operation: [days_of_operation],
        distribution_method: distribution_method,
        has_vehicle_pickup: vehicle_pickup,
        is_vehicle_refrigerated: vehicle_refrigerated,
        storage_space_surplus_status: storage_space_for_surplus_food,
        storage_surplus_type: storage_type,
        can_receive_prepared_food: can_you_receive_prepared_food  
    });
    return orgInfo;
}

export {
    findUserOrg,
    updateOrg
}