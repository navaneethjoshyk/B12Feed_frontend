import { User, Organization, ResourcePost, ClaimStatus, ResourceImage } from '../models/dbSchema.js';
import {IMAGEKIT_PRIVATE_KEY} from '../config/config.js';
import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

// Load the User with it's Organization
const findUserOrg = (email) => {
    const user = User.findOne({
        email: email
    }).populate('userOrg');
    return user.userOrg;
}

// Load the Org
const updateOrg = (id, form) => {
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

    const identification = id;

    const orgInfo = User.findOneAndUpdate({
        _id: identification
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

// Posting Resources
const resourcePost = async (user, resourceForm, imageFile) => {
    const {_id, userOrg} = user;
    const {
        title,
        category,
        description,
        quantity,
        unit,
        condition,
        pickupWindow,
        pickupAddress,
        expiryDate,
        urgency,
        handling
    } = resourceForm;
    
    if(!resourceForm) return null;

    const images = await client.files.upload({
        file: imageFile.buffer.toString("base64"),
        folder: '/B12Feed',
        fileName: imageFile.originalname
    });

    const resourceImagePost = await ResourceImage.insertOne({
        image: [images.url],
        image_description: title
    })

    console.log(images)

    const resourcePost = await ResourcePost.insertOne({
        organization_id: userOrg,
        user_id: _id,
        title: title,
        category: category,
        quantity: quantity,
        unit: unit,
        condition: condition,
        pickup_window_start: pickupWindow.from,
        pickup_window_end: pickupWindow.to,
        location: pickupAddress,
        description: description,
        resource_expiry: expiryDate,
        urgency_indicator: urgency,
        handling_requirement: handling,
        created_at: new Date(),
        updated_at: new Date(),
    });

    console.log(resourcePost)
    
    return resourcePost;
}

const claimResource = async(postId, user) => {
    const resourcePost = await ResourcePost.findById(postId);
    console.log(resourcePost)
    const claimResource = await ClaimStatus.insertOne({
        status: 'pending pickup',
        resource_post_id: resourcePost._id,
        organization_id: resourcePost.organization_id,
        user_id: resourcePost.user_id,
        claimed_date: new Date(),
        expired_date: new Date().setDate(new Date().getDate() + 1),
    })
    resourcePost.claim_status_id = claimResource._id;
    resourcePost.save();
    return claimResource;
}

export {
    findUserOrg,
    updateOrg,
    resourcePost,
    claimResource
}