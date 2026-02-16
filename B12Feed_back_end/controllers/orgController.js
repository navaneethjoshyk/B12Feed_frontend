import { findUserOrg, resourcePost, updateOrg } from "../services/orgService.js"

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

export {
    userOrg,
    postResource
}