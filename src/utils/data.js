
export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
	image{
		asset->{
			url
		}
	},
	_id,
	postedBy->{
		_id,
		userName,
		image
	},
} `;
	
export const pinDetailQuery = (pinId) => {
	const query = `*[_type == "pin" && _id == '${pinId}']{
		image{
			asset->{
				url
			}
		},
		_id,
		title, 
		about,
		province,
		postedBy->{
			_id,
			userName,
			image
		},
		comments[]{
			comment,
			_key,
			postedBy->{
				_id,
				userName,
			image
			},
		}
	}`;
	return query;
};

export const pinDetailMorePinQuery = (snap) => {
	const query = `*[_type == "pin" && province == '${snap.province}' && _id != '${snap._id}' ]{
		image{
			asset->{
				url
			}
		},
		_id,
		postedBy->{
			_id,
			userName,
			image
		},
	}`;
	return query;
};

export const searchQuery = (searchTerm) => {
	const query = `*[_type == "pin" && title match '${searchTerm}*' || province match '${searchTerm}*' || about match '${searchTerm}*']{
		image{
			asset->{
			url
			}
		},
		_id,
		postedBy->{
			_id,
			userName,
			image
		},
	}`;
	return query;
};

export const userQuery = (userId) => {
	const query = `*[_type == "user" && _id == '${userId}']`;
	return query;
};

export const userCreatedPinsQuery = (userId) => {
	const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
		image{
			asset->{
				url
			}
		},
		_id,
		postedBy->{
			_id,
			userName,
			image
		},
	}`;
	return query;
};

export const provinces = [
	{
	name: 'Abra',
	}
	,{
	name: 'Agusan del Norte',
	}
	,{
	name: 'Agusan del Sur',
	}
	,{
	name: 'Aklan',
	}
	,{
	name: 'Albay',
	}
	,{
	name: 'Angeles',
	}
	,{
	name: 'Antique',
	}
	,{
	name: 'Apayao',
	}
	,{
	name: 'Aurora',
	}
	,{
	name: 'Bacolod',
	}
	,{
	name: 'Baguio',
	}
	,{
	name: 'Basilan',
	}
	,{
	name: 'Bataan',
	}
	,{
	name: 'Batanes',
	}
	,{
	name: 'Batangas',
	}
	,{
	name: 'Benguet',
	}
	,{
	name: 'Biliran',
	}
	,{
	name: 'Bohol',
	}
	,{
	name: 'Bukidnon',
	}
	,{
	name: 'Bulacan',
	}
	,{
	name: 'Butuan',
	}
	,{
	name: 'Cagayan',
	}
	,{
	name: 'Cagayan de Oro',
	}
	,{
	name: 'Caloocan',
	}
	,{
	name: 'Camarines Norte',
	}
	,{
	name: 'Camarines Sur',
	}
	,{
	name: 'Camiguin',
	}
	,{
	name: 'Capiz',
	}
	,{
	name: 'Catanduanes',
	}
	,{
	name: 'Cavite',
	}
	,{
	name: 'Cebu',
	}
	,{
	name: 'Compostela Valley',
	}
	,{
	name: 'Cotabato',
	}
	,{
	name: 'Dagupan',
	}
	,{
	name: 'Davao',
	}
	,{
	name: 'Davao del Norte',
	}
	,{
	name: 'Davao del Sur',
	}
	,{
	name: 'Davao Oriental',
	}
	,{
	name: 'Eastern Samar',
	}
	,{
	name: 'General Santos',
	}
	,{
	name: 'Guimaras',
	}
	,{
	name: 'Ifugao',
	}
	,{
	name: 'Iligan',
	}
	,{
	name: 'Ilocos Norte',
	}
	,{
	name: 'Ilocos Sur',
	}
	,{
	name: 'Iloilo',
	}
	,{
	name: 'Isabela',
	}
	,{
	name: 'Kalinga',
	}
	,{
	name: 'La Union',
	}
	,{
	name: 'Laguna',
	}
	,{
	name: 'Lanao del Norte',
	}
	,{
	name: 'Lanao del Sur',
	}
	,{
	name: 'Lapu-Lapu',
	}
	,{
	name: 'Las Pinas',
	}
	,{
	name: 'Leyte',
	}
	,{
	name: 'Lucena',
	}
	,{
	name: 'Maguindanao',
	}
	,{
	name: 'Makati',
	}
	,{
	name: 'Malabon',
	}
	,{
	name: 'Mandaluyong City',
	}
	,{
	name: 'Mandaue',
	}
	,{
	name: 'Manila',
	}
	,{
	name: 'Marikina',
	}
	,{
	name: 'Marinduque',
	}
	,{
	name: 'Masbate',
	}
	,{
	name: 'Mindoro Occidental',
	}
	,{
	name: 'Mindoro Oriental',
	}
	,{
	name: 'Misamis Occidental',
	}
	,{
	name: 'Misamis Oriental',
	}
	,{
	name: 'Mountain Province',
	}
	,{
	name: 'Muntinlupa',
	}
	,{
	name: 'Naga',
	}
	,{
	name: 'Navotas',
	}
	,{
	name: 'Negros Occidental',
	}
	,{
	name: 'Negros Oriental',
	}
	,{
	name: 'Northern Samar',
	}
	,{
	name: 'Nueva Ecija',
	}
	,{
	name: 'Nueva Vizcaya',
	}
	,{
	name: 'Olongapo',
	}
	,{
	name: 'Ormoc',
	}
	,{
	name: 'Palawan',
	}
	,{
	name: 'Pampanga',
	}
	,{
	name: 'Pangasinan',
	}
	,{
	name: 'Paranaque',
	}
	,{
	name: 'Pasay',
	}
	,{
	name: 'Pasig',
	}
	,{
	name: 'Pateros',
	}
	,{
	name: 'Puerto Princesa',
	}
	,{
	name: 'Quezon',
	}
	,{
	name: 'Quezon City',
	}
	,{
	name: 'Quirino',
	}
	,{
	name: 'Rizal',
	}
	,{
	name: 'Romblon',
	}
	,{
	name: 'Samar',
	}
	,{
	name: 'San Juan',
	}
	,{
	name: 'Santiago',
	}
	,{
	name: 'Sarangani',
	}
	,{
	name: 'Siquijor',
	}
	,{
	name: 'Sorsogon',
	}
	,{
	name: 'South Cotabato',
	}
	,{
	name: 'Southern Leyte',
	}
	,{
	name: 'Sultan Kudarat',
	}
	,{
	name: 'Sulu',
	}
	,{
	name: 'Surigao del Norte',
	}
	,{
	name: 'Surigao del Sur',
	}
	,{
	name: 'Tacloban',
	}
	,{
	name: 'Taguig',
	}
	,{
	name: 'Tarlac',
	}
	,{
	name: 'Tawi-Tawi',
	}
	,{
	name: 'Valenzuela',
	}
	,{
	name: 'Zambales',
	}
	,{
	name: 'Zamboanga',
	}
	,{
	name: 'Zamboanga del Norte',
	}
	,{
	name: 'Zamboanga del Sur',
	}
	,{
	name: 'Zamboanga Sibugay',
	}
];