class ServerResponse {
    success: boolean
    message: string
    data: any

    constructor(success: boolean, message: string, data: any) {
        this.success = success
        this.message = message
        this.data = data
    }

    static success(message: string, data?: any | null) {
        return new ServerResponse(true, message, data)
    }

    static error(message: string, data?: any | null) {
        return new ServerResponse(false, message, data)
    }

}

export default ServerResponse