using db from '../db/schema';

service ParameterService {

    entity Locations as projection on db.Locations;

    action importExcel(
        data: LargeString
    );
}

annotate ParameterService.importExcel with @Common.SideEffects: {
    TargetEntities: ['/ParameterService.EntityContainer/Locations']
}