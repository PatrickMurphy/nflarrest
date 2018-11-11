var dimensions = {
	list: {
		date: 'Date',
		team: 'Team',
		position: 'Position',
		crime: 'Crime',
		player: 'Player',
		season: 'Season Status'
	},
	structures: {
		date: {
			columns: {
				col1: {
					type: '',
					display_title: '',
					display_description: '',
					is_key: false,
					length: 10
				}
			}
		},
		team: {
			columns: {
				team_id: {
					type: 'varchar',
					display_title: '',
					display_description: '',
					is_key: true,
					length: 10
				}
			}
		}
	}
};
