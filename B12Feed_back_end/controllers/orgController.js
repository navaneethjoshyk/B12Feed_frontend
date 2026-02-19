import { findUserOrg, resourcePost, updateOrg, claimResource } from "../services/orgService.js"

const userOrg = async(request, response, next) => {
    if(!request.user.email) response.json(400).json({
        message: "Please Log in"
    })
    try{
        const orgInfo = await findUserOrg(request.user.email);
        console.log(orgInfo)
        response
            .status(200)
            .json(orgInfo)
    } catch(error) {
        response.status(400);
    }
    
}

const postResource = async(request, response, next) => {
    await resourcePost(request.user, request.body)
    response.json({
        message: "Hello This ran"
    })
}

const postClaimStatus = async(request, response, next) => {
    console.log(request.body.id)
    await claimResource(request.body.id, request.user)
    response.status(200);
}

export {
    userOrg,
    postResource,
    claimResource,
    postClaimStatus
}