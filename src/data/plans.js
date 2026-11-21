export const PLANS = {
    tutor: {
        label: "For tutors",
        free: {
            name: "Starter",
            price: 0,
            blurb: "Everything you need to publish your first batches.",
            features: [
                "Up to 2 tuition posts",
                "Public listing after admin approval",
                "Applicant management dashboard",
                "Profile with bio and photo",
            ],
        },
        pro: {
            name: "Pro Tutor",
            price: 1500,
            blurb: "For tutors who run several batches at once.",
            features: [
                "Unlimited tuition posts",
                "Verified PRO badge on your profile",
                "Everything in Starter",
            ],
        },
    },
    student: {
        label: "For students",
        free: {
            name: "Starter",
            price: 0,
            blurb: "Find a tutor and apply without paying anything.",
            features: [
                "Browse and filter every tuition",
                "Apply and track each request",
                "Profile with bio and photo",
            ],
        },
        pro: {
            name: "Pro Student",
            price: 1000,
            blurb: "Stand out when tutors review their applicants.",
            features: [
                "Priority placement in applicant lists",
                "PRO badge on your applications",
                "Everything in Starter",
            ],
        },
    },
};