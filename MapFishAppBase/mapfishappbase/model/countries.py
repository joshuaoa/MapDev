from sqlalchemy import Column, Table, types
from sqlalchemy.orm import mapper

from mapfish.sqlalchemygeom import Geometry
from mapfish.sqlalchemygeom import GeometryTableMixIn

from mapfishappbase.model.meta import metadata, engine

countries_table = Table(
    'countries', metadata,
    Column('the_geom', Geometry(4326)),
    autoload=True, autoload_with=engine)

class Country(GeometryTableMixIn):
    # for GeometryTableMixIn to do its job the __table__ property
    # must be set here
    __table__ = countries_table

mapper(Country, countries_table)
