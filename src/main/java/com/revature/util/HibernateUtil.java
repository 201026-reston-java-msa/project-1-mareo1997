package com.revature.util;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {

	private static Session ses;
	// We will use the SessionFactory interface to create a Configuration()
	// Object which will call the .configure method on on our "hibernate.cfg.xml"
	private static SessionFactory sf = new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
	
	private static Logger log = Logger.getLogger(HibernateUtil.class);

	// We will create a getSession() method which is called in our DAO layer
	// This method obtains a JDBC connection which we use to perform a
	// transaction against our DB
	public static Session getSession() {
		log.info("Getting session\n");
		if (ses == null) {
			log.info("Returning session\n");
			ses = sf.openSession();
		}
		return ses;
	}

	// This closes an active connection
	public static void closeSes() {
		
		ses.close();
		//sf.close();
		// By closing our session, you free up the connections from the connection
		// pool to be used by a new session.
	}

}
