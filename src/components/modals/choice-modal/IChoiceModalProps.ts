export interface IChoiceModalProps {
    handle_reset_modal: () => void,
    access_token: string | undefined,
    user_id: string | undefined,
    exit_function: (bool: boolean) => void,
    loading_modal: (bool: boolean) => void,
    display_name: string | undefined,
}