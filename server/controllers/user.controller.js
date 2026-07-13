//Get all users except the logged in user
export const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

       return res.json({success:true,filteredUsers})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false, message:error.message})
    }
}