import { Lifetime, ParentBaseObject, RESOLVER } from "@pkg/lib-containers";

export default class ServiceDatabase extends ParentBaseObject {
	public static [RESOLVER] = {
		lifetime: Lifetime.SINGLETON,
		priority: 1,
	};
}
