import { AreaMolhada } from "./use-cases/area-molhada";
import { Bancada } from "./use-cases/bancada";
import { CubaEsculpida } from "./use-cases/cuba-esculpida";
import { Cuba } from "./use-cases/cuba";
import { Frontao } from "./use-cases/frontao";
import { Rodabase } from "./use-cases/rodabase";
import { LateralSimples } from "./use-cases/lateral-simples";
import { LateralDupla } from "./use-cases/lateral-dupla";
import { MATERIALS as STOCK } from "./material";

const Marmore = {
  AreaMolhada,
  Bancada,
  Cuba,
  CubaEsculpida,
  Frontao,
  LateralDupla,
  LateralSimples,
  Rodabase,
  STOCK
};

export default Marmore;
