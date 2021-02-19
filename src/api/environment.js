// Miljøvariabler som kan brukes hvor som helst i prosjektet

const base_url = "";

export const environment = {
    api_login: base_url + "/login",
    api_refresh_token: base_url + "/refresh",

    api_get_user_data: base_url + "/getUserData",
    api_post_update_user: base_url + "/update",

    api_get_user_jobs_today: base_url + "/dashboard/jobsToday",
    api_get_available_vehicles: base_url + "/dashboard/vehicleToday",
    api_post_book_vehicle: base_url + "/dashboard/bookVehicle",

    api_get_user_jobs: base_url + "/job/getUserJobs",
    api_accept_job: base_url + "/job/accept",
    api_decline_job: base_url + "/job/decline",
    api_comment_job: base_url + "/job/comment",

    api_get_user_status: base_url + "/status/myStatus",
    api_update_status: base_url + "/status/updateStatus",
    api_add_status: base_url + "/status/addStatus",
    api_delete_status: base_url + "/status/removeStatus",
    api_get_all_jobs_today: base_url + "/status/jobsToday",
    api_get_available_employees: base_url + "/status/availableEmployees",

    api_get_users: base_url + "/admin/getUsers",
    api_get_users_without_web_access:
        base_url + "/admin/getUsersWithoutWebaccess",
    api_grant_web_access: base_url + "/admin/grantWebAccess",
    api_revoke_web_access: base_url + "/admin/revokeWebAccess",
    api_update_access_level: base_url + "/admin/updateAccessLevel",

    moment_format: "YYYY-MM-DDTHH:mm:ss.SSSSSSS+ZZ",
};
