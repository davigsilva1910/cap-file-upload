using db from '../db/schema';

service ParameterService {

    entity Locations as projection on db.Locations;

    action importExcel(
        data: LargeString
    );
}