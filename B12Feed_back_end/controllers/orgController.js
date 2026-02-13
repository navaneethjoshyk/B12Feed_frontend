import { findUserOrg, updateOrg } from "../services/orgService.js"

const onboarding = async(request, response, next) => {
    findUserOrg
    response.json({
        message: "hello"
    })
}

export {
    onboarding
}