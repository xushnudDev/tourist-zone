export const TouristZoneTable = `
    create table if not exists tourist_zones (
        id serial primary key,
        name varchar(255) unique not null,
        description text not null,
        location varchar not null,
        images varchar(255) [] not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp
    )
`