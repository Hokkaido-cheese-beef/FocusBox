import { useSelector } from "react-redux"
import { UserState } from "../../states/userState"

export const useUserState = () => {
    return useSelector((state: { user: UserState }) => state)
}