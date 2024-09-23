export default {
    name: 'Account',
    title: 'See, edit and manage your FurWaz account',
    description: 'View, edit and manage your account, your profile, and your applications on FurWaz!',
    dangerZone: 'Danger zone',
    delete: {
        title: 'Delete my account',
        description: 'Do you really want to delete your account? This action is irreversible.',
        onAllApps: 'Delete on all applications',
        action: 'Yes, delete my account'
    },
    informations: {
        title: 'My informations',
        description: 'View and edit your personal informations.',
    },
    applications: {
        title: 'My applications',
        description: 'Manage your FurWaz applications and their settings.',
        search: 'Search applications...',
        loading: 'Loading applications...',
        nothing: 'No application found.',
        error: 'An error occurred while loading applications.'
    },
    connections: {
        title: 'My connections',
        description: 'See and manage your connections with other services.',
        search: 'Search connections...',
        loading: 'Loading connections...',
        nothing: 'No connection found.',
        error: 'An error occurred while loading connections.',
        firstDate: 'First connection on {date}',
    },
    settings: {
        title: 'My settings',
        description: 'Customize your preferences and account settings.',
        noSettings: 'No settings available.'
    }
}